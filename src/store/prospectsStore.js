import { defineStore } from 'pinia'
import axios from 'axios'
import {getContacts} from "@/api/contacts.js";

export const useProspectsStore = defineStore('prospects', {
    state: () => ({
        prospects: [],
        selectedProspect: null,
        loading: false,
        error: null
    }),

    getters: {
        getProspectById: (state) => (id) =>
            state.prospects.find(p => p.id === id)
    },

    actions: {
        async loadProspects() {
            this.loading = true
            this.error = null

            try {
                const res = await getContacts();

                // L’API renvoie "id_contact" → on mappe vers "id"
                this.prospects = res.data.contacts.map(c => ({
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
                this.error = err
            } finally {
                this.loading = false
            }
        },

        selectProspect(id) {
            this.selectedProspect = this.getProspectById(id)
        }
    }
})
