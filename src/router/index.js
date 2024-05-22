import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Task from '@/views/Task.vue'
import Calendar from '@/views/calendar.vue'
import Financeiro from '@/views/financeiro.vue'
import Cadastro_user from '@/views/cadastro_user.vue'
import Login from '@/views/login.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/task',
    name: 'task',
    component: Task
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/finance',
    name: 'finance',
    component: Financeiro
  },
  {
    path: '/cada_user',
    name: 'cada_user',
    component: Cadastro_user

  },
  {
    path: '/',
    name: 'login',
    component: Login

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
