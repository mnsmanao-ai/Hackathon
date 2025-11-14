import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import ProspectView from '@/views/ProspectView.vue'
import LoginView from "@/views/LoginView.vue";
import ProspectDetailView from "@/views/ProspectDetailView.vue";
import SupportView from "@/views/SupportView.vue";
import { useAuthStore } from '@/store/authStore'

const routes = [
    {
        path: '/auth',
        meta: { layout: 'auth' },
        children: [
            { path: 'login', component: LoginView, meta: { layout: 'auth', public: true } },
        ],
    },
    {
        path: '/',
        children: [
            { path: 'dashboard', component: DashboardView },
            { path: 'prospects', component: ProspectView },
            { path: 'support', component: SupportView },
            { path: 'prospects/:id', name: 'prospect-detail', component: ProspectDetailView, props: true }
        ],
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Navigation Guard pour protéger les routes
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const isPublic = to.meta.public || false;

    if (!isPublic && !auth.isAuthenticated) {
        return next("/auth/login");
    }
    next();
});

export default router;
