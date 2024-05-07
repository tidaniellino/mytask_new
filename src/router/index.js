import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Task from '@/views/Task.vue'
import Calendar from '@/views/calendar.vue'
import Financeiro from '@/views/financeiro.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
