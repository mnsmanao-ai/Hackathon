import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ProspectView from '@/views/ProspectView.vue'
import LoginView from "@/views/LoginView.vue";
import ProspectDetailView from "@/views/ProspectDetailView.vue";
import { useAuthStore } from '@/store/authStore'

const routes = [
    {
        path: '/auth',
        meta : { layout: 'auth' },
        children: [
            { path: 'login', component: LoginView, meta : { layout: 'auth', public: true } },
        ],
    },
    {
        path: '/',
        children: [
            { path: 'dashboard', component: DashboardView },
            { path: 'prospects', component: ProspectView },
            { path: 'prospects/:id', name: 'prospect-detail', component: ProspectDetailView, props: true }
            // autres routes internes
        ],
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
