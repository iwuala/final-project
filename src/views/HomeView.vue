<script setup>
  import Header from '../components/Header.vue';
</script>

<template>
  <div>
    <Header />
    <div class="home-wrapper">
      <h1 class="home-tittle">Keep track of all your tasks</h1>
      <router-link to="Signup" class="get-started"> Get Started</router-link>
      <div>
        <span class="already-have">Already have an account? </span>
        <router-link to="Login" class="login"> Login</router-link>
      </div>
    </div>
  </div>
</template>

