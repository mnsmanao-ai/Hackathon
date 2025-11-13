import { defineStore } from 'pinia'

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
                // ⚠️ Pour l’instant : simulation API
                if (email === 'admin@burostock.fr' && password === 'admin') {
                    const fakeUser = { id: 1, name: 'Admin Burostock', email }
                    const fakeToken = 'jwt-simulation-token'

                    this.user = fakeUser
                    this.token = fakeToken

                    localStorage.setItem('user', JSON.stringify(fakeUser))
                    localStorage.setItem('token', fakeToken)

                    return { success: true }
                } else {
                    throw new Error('Identifiants invalides')
                }
            } catch (err) {
                return { success: false, message: err.message }
            }
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
    },
})
