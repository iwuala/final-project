<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();

const isComplete = ref(false);
const title = ref("");

const handleAdd = (title) => {    
    if (taskStore.tasks.length === 0) {     
      taskStore.addTask(title);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    } else {
      taskStore.addTask(title);
    }
  clear();
};

const clear = () => {
    title.value = '';
};

</script>

<template>
  <div class="task-wrapper">
    <label for="task" class="task-label">Task Todo</label>

    <input
      type="text"
      id="task"
      class="task-input"
      placeholder="Enter your todo"
      v-model="title"
    />
    <button
      class="submit-todo task-button"
      @click="handleAdd(title, id)"
      :style="{
        color: taskStore.tasks.id ? '#fffaee' : '#0A1828',
        backgroundColor: taskStore.tasks.id ? '#1a928e' : '#BFA181',
      }"
    >
      {{ taskStore.tasks.id ? "UPDATE" : "SUBMIT" }}
    </button>
  </div>
</template>