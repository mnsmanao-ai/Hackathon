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
        async register(firstname, lastname, email, password, phone) {
            try {
                const res = await fetch("https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firstname, lastname, email, password, phone })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Erreur lors de l'inscription");
                return { success: true };
            } catch (err) {
                return { success: false, message: err.message };
            }
        },

        async login(email, password) {
            try {
                const res = await fetch("https://jkgsgkgos8w0o4cwwoowg0go.lucieblr.com/login", {
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

                router.push("/dashboard");
                return { success: true };
            } catch (err) {
                return { success: false, message: err.message };
            }
        },

        logout() {
            // Supprime les données utilisateur
            this.user = null;
            this.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            // Redirige vers la page de login
            router.push("/auth/login");
        }
    }
});


