import { defineStore } from "pinia";
import supabase from "../lib/supabase";
import { ref, watchEffect } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref([]);
  const added = ref("");

  watchEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        // .order("id", { ascending: false });
      if (error) {
        console.log(error);
      } else {
        tasks.value = data;
        console.log(tasks.value);
      }
    };

    return fetchTasks();
  });

  const addTask = async (title, isComplete) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title: title,
        is_complete: isComplete,
        user_id: userStore.userData.id,
      })
      .select("*");

    if (error) {
      alert(error.message);
      console.log("error: ", error);
    } else {
      added.value = data;
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      alert(error.message);
    } else {
      console.log("deleted");
    }
  };

  supabase
    .channel("any")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "tasks" },
      (payload) => {
        tasks.value.push(payload.new);
      }
    )
    .subscribe();

  return { addTask, added, tasks, deleteTask };
});
