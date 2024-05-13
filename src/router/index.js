import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/forgotpassword',
      name: 'forgotpassword',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/user/:id',
      name: 'usermenu',
      component: () => import('../views/UserMenu.vue')
    },
    {
      path: '/admin',
      name: 'adminmenu',
      component: () => import('../views/AdminMenu.vue')
    }
  ]
})

export default router
