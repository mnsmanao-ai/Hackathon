import { defineStore } from 'pinia'
import { fetchProspects } from '@/api/prospectService'

export const useProspectStore = defineStore('prospect', {
    state: () => ({
        list: [],
        selectedProspect: null,
        loading: false
    }),

    actions: {
        async loadProspects() {
            this.loading = true
            try {
                this.list = await fetchProspects()
            } catch (err) {
                console.error('Erreur de chargement des prospects :', err)
            } finally {
                this.loading = false
            }
        },
        selectProspect(id) {
            this.selectedProspect = this.list.find(p => p.id === id)
        }
    }
})
