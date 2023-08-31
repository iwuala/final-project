<script setup>
import Header from "./Header.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const email = ref("");
const password = ref("");

const handleLogIn = (email, password) => {
  userStore.logInUser(email, password);
  setTimeout(() => {
    if (userStore.errorIn) {
      console.log(userStore.errorIn);
    } else {
      userStore.getCurrentUser();
      setTimeout(() => {
        window.location.reload(true);
        console.log('3 secs')
      }, 3000)
    }
  }, 2000);
  userStore.errorIn = "";
};
</script>

<template>
  <div>
    <Header />
    <div class="auth-wrapper">
      <h1 class="auth-tittle" > Log in</h1>
      <label for="email">Email Address</label>
      <input
        type="text"
        id="email"
        placeholder="Enter Email Address"
        v-model="email"
      />
      <label for="password">Password</label>
      <input
        type="text"
        id="password"
        placeholder="Enter Password"
        v-model="password"
      />
      <button class="submit" @click="handleLogIn(email, password)">
        Enter
      </button>
      <br />
      <div class="auth-span">
        <span class="already-have">Don't have an account? </span>
        <router-link to="Signup" class="login"> SignUp </router-link>
      </div>
    </div>
  </div>
</template>
