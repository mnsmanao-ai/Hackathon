import { defineStore } from 'pinia'
import axios from '@/api/axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        async login(credentials) {
            const { data } = await axios.post('/auth/login', credentials)
            this.token = data.token
            this.user = data.user
            localStorage.setItem('token', this.token)
        },
        logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('token')
        }
    }
})
