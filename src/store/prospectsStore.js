import {defineStore} from 'pinia'
// ⚠️ Mise à jour de l'import : on importe maintenant createContact
import {createContact, getContactById, getContacts} from '@/api/contacts'

export const useProspectsStore = defineStore('prospects', {
    state: () => ({
        prospects: [],
        selectedProspect: null,
        loading: false,
        error: null,
        searchQuery: '' // Pour ton getter de recherche
    }),

    getters: {
        // ... (Pas de changement ici)
        getProspectById: (state) => (id) =>
            state.prospects.find(p => p.id === id),

        filteredProspects: (state) => {
            if (!state.searchQuery.trim()) return state.prospects

            const q = state.searchQuery.toLowerCase()

            return state.prospects.filter(p =>
                p.firstname.toLowerCase().includes(q) ||
                p.lastname.toLowerCase().includes(q) ||
                p.email.toLowerCase().includes(q) ||
                // Note : Vérifiez si p.tags existe avant d'appeler toLowerCase()
                (p.tags && p.tags.toLowerCase().includes(q))
            )
        }
    },

    actions: {
        // ... (loadProspects et selectProspect inchangés)

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
            try {
                return getContactById(id)
            } catch (err) {
                this.error = err.message || 'Erreur lors de la sélection du prospect'
            }
        },

        /** Crée un prospect côté Pinia **et l'envoie à l'API** */
        async createProspect(newData) {
            this.loading = true
            this.error = null

            // 1. Préparation des données pour l'API
            // On ne doit envoyer que les champs pertinents (ex: pas d'ID local temporaire)
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
                // L'API devrait gérer les champs last_score, created_at, updated_at
            }

            try {
                // 2. Appel de l'API pour créer le contact
                const createdContact = await createContact(apiData)

                // 3. Transformation du résultat de l'API pour l'état Pinia
                const newProspect = {
                    id: createdContact.id_contact, // Utilise l'ID retourné par l'API
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

                // 4. Mise à jour du store Pinia
                this.prospects.push(newProspect)

                return newProspect

            } catch (err) {
                this.error = err.message || 'Échec de la création du prospect via l\'API'
                throw err // Permet au composant appelant de gérer l'erreur
            } finally {
                this.loading = false
            }
        },

        // ... (updateProspect et setSearchQuery inchangés)

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