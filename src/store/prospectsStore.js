import { defineStore } from 'pinia'
import { getContacts, getContactById, createContact } from '@/api/contacts'

export const useProspectsStore = defineStore('prospects', {
    state: () => ({
        prospects: [],
        selectedProspect: null,
        loading: false,
        error: null,
        searchQuery: ''
    }),

    getters: {
        getProspectById: (state) => (id) =>
            state.prospects.find(p => p.id === id),

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
        /** Récupère les prospects via l’API (sécurisé avec apiFetch) */
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

        /** Sélectionner un prospect (API sécurisée) */
        async selectProspect(id) {
            this.error = null
            try {
                const data = await getContactById(id)
                this.selectedProspect = data
                return data
            } catch (err) {
                this.error = err.message
            }
        },

        /** Création d’un prospect avec apiFetch */
        async createProspect(newData) {
            this.loading = true
            this.error = null

            const apiData = {
                firstname: newData.firstname,
                lastname: newData.lastname,
                email: newData.email,
                phone: newData.phone || null,
                company_id: newData.company_id || null,
                potential_value: newData.potential_value || 0,
                source: newData.source || 'Manuel',
                status_interaction: newData.status_interaction || 'Nouveau',
                tags: newData.tags || ''
            }

            try {
                const createdContact = await createContact(apiData)

                const newProspect = {
                    id: createdContact.id_contact,
                    firstname: createdContact.firstname,
                    lastname: createdContact.lastname,
                    email: createdContact.email,
                    phone: createdContact.phone,
                    company_id: createdContact.company_id,
                    last_score: createdContact.last_score,
                    potential_value: createdContact.potential_value,
                    source: createdContact.source,
                    status_interaction: createdContact.status_interaction,
                    tags: createdContact.tags,
                    created_at: createdContact.created_at,
                    updated_at: createdContact.updated_at
                }

                this.prospects.push(newProspect)
                return newProspect

            } catch (err) {
                this.error = err.message || "Impossible de créer le prospect"
                throw err
            } finally {
                this.loading = false
            }
        },

        updateProspect(id, updatedData) {
            const index = this.prospects.findIndex(p => p.id === id)
            if (index === -1) return false

            this.prospects[index] = {
                ...this.prospects[index],
                ...updatedData,
                updated_at: new Date().toISOString()
            }

            if (this.selectedProspect?.id === id) {
                this.selectedProspect = this.prospects[index]
            }

            return this.prospects[index]
        },

        setSearchQuery(q) {
            this.searchQuery = q
        }
    }
})
