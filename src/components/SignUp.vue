<script setup>
import Header from "./Header.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();

const email = ref("");
const userName = ref("");
const password = ref("");

const handleSignUp = (email, password, userName) => {
  userStore.createNewUser(email, password, userName);
  setTimeout(() => { 
    if (userStore.errorUp) {
        console.log(userStore.errorUp);
  } else {
    userStore.getCurrentUser()
    setTimeout(() => {
      router.push({ path: "/tasks" });
    }, 3000)
  }
  }, 2000)
  userStore.errorUp = "";
};
</script>

<template>
  <div>
    <Header />
    <div class="auth-wrapper">
      <h1 class="auth-tittle">Sign Up</h1>
      <label for="username">Username</label>
      <input
        id="username"
        placeholder="Enter Display Name"
        v-model="userName"
      />
      <label for="email">Email Address</label>
      <input id="email" placeholder="Enter Email Address" v-model="email" />
      <label for="password">Password</label>
      <input
        type="text"
        id="password"
        placeholder="Enter Password"
        v-model="password"
      />
      <button @click="handleSignUp(email, password, userName)" class="submit">Submit</button>
      <br />
      <div class="auth-span">
        <span class="already-have">Already have an account? </span>
        <router-link to="Login" class="login"> Login </router-link>
      </div>
    </div>
  </div>
</template>
