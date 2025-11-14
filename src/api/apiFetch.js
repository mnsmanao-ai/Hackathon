// src/api/apiFetch.js
import { useAuthStore } from '@/store/authStore'

export async function apiFetch(url, options = {}) {
    const auth = useAuthStore()

    const finalOptions = { ...options }

    // S'assurer que headers existe
    finalOptions.headers = {
        ...(options.headers || {})
    }

    // Ajout du token uniquement si existant
    if (auth.token) {
        finalOptions.headers['Authorization'] = `Bearer ${auth.token}`
    }

    // Ajout automatique du Content-Type uniquement si un body existe
    if (finalOptions.body && !finalOptions.headers['Content-Type']) {
        finalOptions.headers['Content-Type'] = 'application/json'
    }

    const res = await fetch(url, finalOptions)

    let data = null
    try {
        data = await res.json()
    } catch (_) {}

    if (!res.ok) {
        throw new Error(data?.message || `Erreur API ${res.status}`)
    }

    return data
}
