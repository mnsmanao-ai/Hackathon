import { defineStore } from 'pinia'

export const useProspectsStore = defineStore('prospects', {
    state: () => ({
        prospects: [
            {
                id: 1,
                company: 'Dupont SARL',
                contact: 'Marie Dupont',
                email: 'marie@dupont.fr',
                phone: '02 99 11 22 33',
                lastInteraction: '2025-11-01',
                channel: 'Salon professionnel',
                score: 78,
                address: '12 rue de la Paix, 35000 Rennes',
                sector: 'Mobilier professionnel',
                history: [
                    { date: '2025-11-01', event: 'Rdv showroom', note: 'Très intéressée' },
                    { date: '2025-09-20', event: 'Email commercial', note: 'Ouvert' },
                    { date: '2025-06-12', event: 'Achat chaise modèle X' }
                ],
                actions: ['Relancer par téléphone', 'Proposer visite showroom', 'Attribuer au commercial : Laura']
            },
            {
                id: 2,
                company: 'Atelier Pro',
                contact: 'Paul Martin',
                email: 'paul@atelier.pro',
                phone: '01 23 45 67 89',
                lastInteraction: '2025-10-15',
                channel: 'Web',
                score: 51,
                address: '8 avenue des Artisans, 44000 Nantes',
                sector: 'Menuiserie',
                history: [
                    { date: '2025-10-15', event: 'Formulaire web', note: 'Demande devis' },
                    { date: '2025-07-01', event: 'Appel commercial' }
                ],
                actions: ['Envoyer email de relance', 'Préparer devis personnalisé']
            },
            {
                id: 3,
                company: 'TechNova',
                contact: 'Lucas Bernard',
                email: 'lucas@technova.fr',
                phone: '05 64 22 98 11',
                lastInteraction: '2025-11-10',
                channel: 'LinkedIn',
                score: 92,
                address: '5 boulevard des Sciences, 31000 Toulouse',
                sector: 'Informatique B2B',
                history: [
                    { date: '2025-11-10', event: 'Réunion visio', note: 'Projet en cours de signature' },
                    { date: '2025-10-25', event: 'Appel de découverte' }
                ],
                actions: ['Préparer contrat', 'Notifier direction commerciale']
            },
            {
                id: 4,
                company: 'GreenBuild',
                contact: 'Emma Leclerc',
                email: 'emma@greenbuild.fr',
                phone: '03 21 33 22 11',
                lastInteraction: '2025-10-30',
                channel: 'Salon éco-construction',
                score: 66,
                address: '10 rue Verte, 59000 Lille',
                sector: 'BTP durable',
                history: [
                    { date: '2025-10-30', event: 'Rdv salon', note: 'Intéressée par solutions écologiques' },
                    { date: '2025-09-01', event: 'Email promo' }
                ],
                actions: ['Envoyer brochure éco-mobilier', 'Relancer sous 1 semaine']
            },
            {
                id: 5,
                company: 'NovaDesign',
                contact: 'Chloé Richard',
                email: 'chloe@novadesign.fr',
                phone: '09 74 22 87 50',
                lastInteraction: '2025-09-25',
                channel: 'Email',
                score: 42,
                address: '27 rue du Parc, 75010 Paris',
                sector: 'Design intérieur',
                history: [
                    { date: '2025-09-25', event: 'Email commercial', note: 'Non répondu' },
                    { date: '2025-07-03', event: 'Salon mobilier Paris' }
                ],
                actions: ['Relancer par téléphone', 'Vérifier adresse email']
            },
            {
                id: 6,
                company: 'BlueCom',
                contact: 'Nicolas Duret',
                email: 'nicolas@bluecom.fr',
                phone: '04 85 90 12 78',
                lastInteraction: '2025-11-09',
                channel: 'Téléphone',
                score: 84,
                address: '22 avenue du Rhône, 69002 Lyon',
                sector: 'Communication digitale',
                history: [
                    { date: '2025-11-09', event: 'Appel suivi', note: 'Demande devis' },
                    { date: '2025-10-12', event: 'Contact initial via site' }
                ],
                actions: ['Envoyer devis PDF', 'Créer opportunité CRM']
            },
            {
                id: 7,
                company: 'AutoMec',
                contact: 'Jean-Pierre Mercier',
                email: 'jp.mercier@automec.fr',
                phone: '02 35 78 11 44',
                lastInteraction: '2025-08-02',
                channel: 'Salon automobile',
                score: 59,
                address: '15 rue des Moteurs, 76000 Rouen',
                sector: 'Équipement industriel',
                history: [
                    { date: '2025-08-02', event: 'Rdv salon', note: 'Demande d’échantillons' },
                    { date: '2025-06-10', event: 'Email de suivi' }
                ],
                actions: ['Relancer commercialement', 'Préparer devis matériel']
            },
            {
                id: 8,
                company: 'EcoOffice',
                contact: 'Sarah Benali',
                email: 'sarah@ecooffice.fr',
                phone: '01 45 09 76 32',
                lastInteraction: '2025-11-06',
                channel: 'Email',
                score: 70,
                address: '9 rue du Commerce, 75015 Paris',
                sector: 'Mobilier éco-responsable',
                history: [
                    { date: '2025-11-06', event: 'Réponse email', note: 'Souhaite devis global' },
                    { date: '2025-10-28', event: 'Premier contact' }
                ],
                actions: ['Créer devis', 'Planifier rendez-vous']
            },
            {
                id: 9,
                company: 'DataLink',
                contact: 'Alexandre Fournier',
                email: 'alex@datalink.io',
                phone: '06 12 45 67 00',
                lastInteraction: '2025-11-05',
                channel: 'API intégration',
                score: 88,
                address: '40 rue du Numérique, 33000 Bordeaux',
                sector: 'Technologies SaaS',
                history: [
                    { date: '2025-11-05', event: 'Appel technique', note: 'Intégré API CRM' },
                    { date: '2025-09-19', event: 'Email de test API' }
                ],
                actions: ['Faire suivi post-intégration', 'Proposer upgrade pro']
            },
            {
                id: 10,
                company: 'ArtisWood',
                contact: 'Valentin Perrin',
                email: 'valentin@artiswood.fr',
                phone: '04 71 10 88 54',
                lastInteraction: '2025-10-01',
                channel: 'Salon métiers bois',
                score: 47,
                address: '2 rue des Ateliers, 15000 Aurillac',
                sector: 'Menuiserie artisanale',
                history: [
                    { date: '2025-10-01', event: 'Rencontre salon', note: 'Demande catalogue' },
                    { date: '2025-09-10', event: 'Appel informatif' }
                ],
                actions: ['Envoyer catalogue PDF', 'Relancer dans 10 jours']
            },
            {
                id: 11,
                company: 'Medilab',
                contact: 'Dr. Sophie Lemoine',
                email: 'sophie@medilab.fr',
                phone: '03 44 19 87 21',
                lastInteraction: '2025-11-11',
                channel: 'Appel',
                score: 95,
                address: '100 rue Pasteur, 60000 Beauvais',
                sector: 'Équipement médical',
                history: [
                    { date: '2025-11-11', event: 'Appel commercial', note: 'Souhaite contrat cadre' },
                    { date: '2025-10-12', event: 'Email de présentation' }
                ],
                actions: ['Préparer offre groupée', 'Notifier direction ventes']
            },
            {
                id: 12,
                company: 'CityPrint',
                contact: 'Thomas Garnier',
                email: 'thomas@cityprint.fr',
                phone: '02 98 67 12 45',
                lastInteraction: '2025-09-22',
                channel: 'Web',
                score: 60,
                address: '18 boulevard de la Liberté, 29000 Quimper',
                sector: 'Impression & signalétique',
                history: [
                    { date: '2025-09-22', event: 'Demande devis en ligne' },
                    { date: '2025-09-18', event: 'Visite site web' }
                ],
                actions: ['Envoyer proposition', 'Programmer relance mail']
            }
        ],
        selectedProspect: null
    }),

    getters: {
        getProspectById: (state) => (id) => state.prospects.find(p => p.id === id)
    },

    actions: {
        selectProspect(id) {
            this.selectedProspect = this.getProspectById(id)
        }
    }
})
