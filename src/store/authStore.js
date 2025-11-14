import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(email, password) {
            try {
                const res = await fetch("http://localhost:3307/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Erreur de connexion");

                this.user = data.user;
                this.token = data.token;

                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);

                router.push("/dashboard"); // redirige après connexion
                return { success: true };
            } catch (err) {
                return { success: false, message: err.message };
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.push("/auth/login");
        }
    }
});

// Utilitaire pour toutes les requêtes API avec token
export const apiFetch = async (url, options = {}) => {
    const auth = useAuthStore();
    const headers = {
        "Content-Type": "application/json",
        ...(auth.token ? { "Authorization": `Bearer ${auth.token}` } : {})
    };
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
        auth.logout();
        throw new Error("Session expirée, veuillez vous reconnecter");
    }
    return res.json();
};
