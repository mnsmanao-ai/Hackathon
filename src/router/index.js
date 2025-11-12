import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ProspectView from '@/views/ProspectView.vue'

const routes = [
    { path: '/dashboard', component: DashboardView, meta: { layout: 'default' } },
    { path: '/prospects', component: ProspectView, meta: { layout: 'default' } },
    { path: '/', redirect: '/dashboard' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
