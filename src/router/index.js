import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const user = localStorage.getItem('userData');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tasks',
      name: 'todo',
      component: () => import('../views/TasksView.vue'),
      beforeEnter: (to, from, next) => {
        if (user !== null) {
          // User is authenticated, allow access
          next();
        } else {
          // User is not authenticated, redirect to login or another route
          next('/Login'); // Redirect to login page
        }
      }
    },
    {
      path: '/Signup',
      name: 'signup-page',
      component: () => import('../components/SignUp.vue'),
      beforeEnter: (to, from, next) => {
        if (user === null) {
          // User is not authenticated, allow access
          next();
        } else {
          // User is authenticated, redirect to login tasks page
          next('/tasks'); // Redirect to tasks page
        }
      }
    },
    {
      path: '/Login',
      name: 'login-page',
      component: () => import('../components/LogIn.vue'),
      beforeEnter: (to, from, next) => {
        if (user === null) {
          // User is not authenticated, allow access
          next();
        } else {
          // User is authenticated, redirect to login tasks page
          next('/tasks'); // Redirect to tasks page
        }
      }
    }
  ]
})

export default router
