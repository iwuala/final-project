<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const handleLogOut = () => {
  userStore.logOutUser();
  localStorage.clear("userData");
  window.location.reload(true);
};
</script>

<template>
  <div class="header-wrapper">
    <router-link class="logo" to="/">My todo</router-link>
    <nav class="nav-bar">
      <span id="user" v-if="userStore.userData">
        Greetings {{ userStore.userData.user_metadata.user_name }}</span
      >
      <router-link to="Signup" class="nav-li" v-else>SignUp</router-link>
      <span
        id="logout"
        class="nav-li"
        v-if="userStore.userData"
        @click="handleLogOut()"
        >Logout</span
      >
      <router-link to="Login" class="nav-li" v-else> Login </router-link>
    </nav>
  </div>
</template>
