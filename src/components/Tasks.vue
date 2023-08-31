<script setup>
import Header from "./Header.vue";
import { ref, watchEffect } from "vue";
import { useTaskStore } from "@/stores/task";
import AddTask from "./AddTask.vue";
import supabase from "../lib/supabase";

const taskStore = useTaskStore();

const titleToUpdate = ref("");
const idToUpdate = ref("");

// const isComplete = ref(false);

// Handle which element opens after 3sec load between no tasks div and show task div
const showElement = ref(false);

watchEffect(() => {
  setTimeout(() => {
    if (taskStore.tasks.length !== 0) {
      showElement.value = true;
    }
  }, 2000);
});

const modalAdd = ref(false);
const modalUpdate = ref(false);

const toggleModal = () => {
  if (modalUpdate.value === true) {
    modalUpdate.value = false;
  } else if (modalAdd) {
    modalAdd.value = !modalAdd.value;
  }
};

const linkToggleModal = () => {
  if (modalAdd.value === false) {
    modalAdd.value = true;
  } 
};

const handleDelete = (id) => {
  const del = taskStore.tasks.filter((task) => task.id !== id);
  taskStore.tasks = del;
  taskStore.deleteTask(id);
};

const handleEdit = (task) => {
  if (modalAdd.value === true && modalUpdate.value === false) {
    modalAdd.value = false;
    modalUpdate.value = true;
  } else if (modalUpdate.value === false) {
    modalUpdate.value = true;
  }
  titleToUpdate.value = task.title;
  idToUpdate.value = task.id
};

const handleUpdate = async (id) => {
  const { data, error } = await supabase
      .from("tasks")
      .update({ title: titleToUpdate.value })
      .eq("id", idToUpdate.value)
      .select("*");
    if (error) {
      alert(error.message);
    } else {
      console.log("updated: ", data);
    }
  setTimeout(() => {
    window.location.reload(true)
  }, 1500);
};

const toggleIsComplete = async (task) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ is_complete: !task.is_complete })
      .eq("id", task.id)
      .select("is_complete");
    if (error) {
      alert(error.message);
    } else {
      console.log("updated: ", data);
    }
  task.is_complete = !task.is_complete;
};
</script>

<template>
  <div>
    <Header />
    <div class="task-container">
      <button
        class="add-todo task-button"
        @click="toggleModal"
        :style="{
          color: modalAdd || modalUpdate ? '#0A1828' : '#fffaee',
          backgroundColor: modalAdd || modalUpdate ? '#BFA181' : '#1a928e',
        }"
      >
        {{ modalAdd || modalUpdate ? "CLOSE" : "ADD" }}
      </button>

      <AddTask v-if="modalAdd" />

      <div class="task-wrapper" v-if="modalUpdate">
        <label for="task" class="task-label">Task Todo</label>
        <input type="text" v-model="titleToUpdate" class="task-input" />
        <button
          class="submit-todo task-button"
          @click="handleUpdate()"
          style="
        color: '#0A1828',
        background-color: '#BFA181',"
        >
          UPDATE
        </button>
      </div>

      <div class="task-wrapper" v-if="showElement">
        <div
          class="single-task"
          v-bind:key="task.id"
          v-for="task in taskStore.tasks"
        >
          <div class="inline">
            <font-awesome-icon
              @click="toggleIsComplete(task)"
              icon="fa-solid fa-circle-check"
              :style="{
                color: task.is_complete ? '#1a928e' : 'rgb(206, 206, 206)',
                fontSize: '1.1em',
                cursor: 'pointer',
              }"
            />
            <h1 class="task-tittle">{{ task.title }}</h1>
          </div>
          <div class="action-bar">
            <font-awesome-icon
              @click="handleEdit(task)"
              icon="fa-solid fa-pen-to-square"
              style="color: #07376d; font-size: 0.9em; cursor: pointer"
            />
            <font-awesome-icon
              @click="handleDelete(task.id)"
              icon="fa-regular fa-trash-can"
              style="color: #d43939; font-size: 0.9em; cursor: pointer"
            />
          </div>
        </div>
      </div>
      <div class="task-wrapper" v-else, v-if="taskStore.tasks.length === 0">
        <span class="no-task"
          >No task to display,
          <span
            @click="linkToggleModal"
            style="color: #bfa181; text-decoration: underline; margin-left: .3em; cursor: pointer;"
          >
            Add New Todo
          </span></span
        >
      </div>
    </div>
  </div>
</template>