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
    },
    {
      path: '/user/:id/profile',
      name: 'userprofile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/user/:id/store',
      name: 'store',
      component: () => import('../views/StoreView.vue')
    },
    {
      path: '/user/:id/invoice',
      name: 'invoice',
      component: () => import('../views/InvoiceView.vue')
    },
    {
      path: '/user/:id/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/validate',
      name: 'validate',
      component: () => import('../views/ValidateView.vue')
    },
    {
      path: '/search',
      name: 'searchuser',
      component: () => import('../views/SearchUserView.vue')
    },
    {
      path: '/invoice/:id',
      name: 'printedinvoicefile',
      component: () => import('../views/PrintedInvoiceFile.vue')
    },
    {
      path: '/admin/check/user/:id',
      name: 'checkuser',
      component: () => import('../views/UserInfo.vue')
    }
  ]
})

export default router
