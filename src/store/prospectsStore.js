import { defineStore } from 'pinia'
import { getContacts } from '@/api/contacts'

export const useProspectsStore = defineStore('prospects', {
    state: () => ({
        prospects: [],
        selectedProspect: null,
        loading: false,
        error: null,
        searchQuery: '' // Pour ton getter de recherche
    }),

    getters: {
        getProspectById: (state) => (id) =>
            state.prospects.find(p => p.id === id),

        // 🔍 Recherche full-text sur firstname / lastname / email / tags
        filteredProspects: (state) => {
            if (!state.searchQuery.trim()) return state.prospects

            const q = state.searchQuery.toLowerCase()

            return state.prospects.filter(p =>
                p.firstname.toLowerCase().includes(q) ||
                p.lastname.toLowerCase().includes(q) ||
                p.email.toLowerCase().includes(q) ||
                (p.tags && p.tags.toLowerCase().includes(q))
            )
        }
    },

    actions: {
        /** Charge les prospects depuis ton API */
        async loadProspects() {
            this.loading = true
            this.error = null

            try {
                const contacts = await getContacts()

                this.prospects = contacts.map(c => ({
                    id: c.id_contact,
                    firstname: c.firstname,
                    lastname: c.lastname,
                    email: c.email,
                    phone: c.phone,
                    company_id: c.company_id,
                    last_score: c.last_score,
                    potential_value: c.potential_value,
                    source: c.source,
                    status_interaction: c.status_interaction,
                    tags: c.tags,
                    created_at: c.created_at,
                    updated_at: c.updated_at
                }))
            } catch (err) {
                this.error = err.message || 'Erreur inconnue'
            } finally {
                this.loading = false
            }
        },

        /** Sélectionne un prospect */
        selectProspect(id) {
            this.selectedProspect = this.getProspectById(id)
        },

        /** Crée un prospect côté Pinia (et pourra appeler ton API plus tard) */
        createProspect(newData) {
            const newProspect = {
                ...newData,
                id: Date.now(), // ID local temporaire (en attendant une vraie API)
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }

            this.prospects.push(newProspect)

            return newProspect
        },

        /** Modifie un prospect existant */
        updateProspect(id, updatedData) {
            const index = this.prospects.findIndex(p => p.id === id)
            if (index === -1) return false

            this.prospects[index] = {
                ...this.prospects[index],
                ...updatedData,
                updated_at: new Date().toISOString()
            }

            // Si le prospect modifié était sélectionné, on le met aussi à jour
            if (this.selectedProspect?.id === id) {
                this.selectedProspect = this.prospects[index]
            }

            return this.prospects[index]
        },

        /** Change la recherche dans le store */
        setSearchQuery(q) {
            this.searchQuery = q
        }
    }
})
