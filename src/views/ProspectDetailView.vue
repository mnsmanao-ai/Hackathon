<template>
  <section v-if="prospect && prospect.contact" class="prospect-detail">
    <header class="prospect-detail__header">
      <div class="prospects__head">
        <h2>Détail Contact #{{ prospect.contact.id_contact }}</h2>
        <p>
          Contact : **{{ prospect.contact.lastname }} {{ prospect.contact.firstname }}** · Score : <strong>{{ prospect.contact.last_score }}</strong>
        </p>
      </div>

      <div class="prospects__cta">
        <button class="btn btn__secondary" @click="router.push('/prospects')">← Retour</button>
        <button class="btn btn__primary" @click="handleScoreClick">Scorer</button>
      </div>
    </header>

    <div class="prospect-detail__grid">
      <div class="card">
        <h3>Informations</h3>
        <p><strong>Email :</strong> <a :href="`mailto:${prospect.contact.email}`">{{ prospect.contact.email }}</a></p>
        <p><strong>Téléphone :</strong> {{ prospect.contact.phone }}</p>
        <p><strong>Source :</strong> {{ prospect.contact.source }}</p>
        <p><strong>Tags :</strong> {{ prospect.contact.tags }}</p>
        <p><strong>Status interaction :</strong> {{ prospect.contact.status_interaction }}</p>
        <p class="__sub">Dernière maj : {{ formatDate(prospect.contact.updated_at) }}</p>
      </div>

      <div class="card">
        <h3>Historique des Interactions ({{ prospect.interactions.length }})</h3>
        <ul v-if="prospect.interactions && prospect.interactions.length">
          <li v-for="interaction in prospect.interactions" :key="interaction.id_interaction">
            <strong>{{ formatDate(interaction.date_interetaction) }} ({{ interaction.channel }})</strong>
            <p class="__sub">Sujet : {{ interaction.subject }}</p>
          </li>
        </ul>
        <p v-else>Aucune interaction enregistrée.</p>
      </div>

      <div class="card">
        <h3>Scores Récents ({{ prospect.scores.length }})</h3>
        <ul v-if="prospect.scores && prospect.scores.length">
          <li v-for="scoreItem in prospect.scores" :key="scoreItem.id_score">
            Score: **{{ scoreItem.score }}** - Raison : {{ scoreItem.reason }}
            <p class="__sub">Calculé le {{ formatDate(scoreItem.created_at) }} ({{ scoreItem.algorithm_version }})</p>
          </li>
        </ul>
        <p v-else>Aucun score enregistré.</p>
      </div>

      <div class="card">
        <h3>Actions recommandées (IA)</h3>
        <ol>
          <li>Envoyer un email de suivi sur la solution CRM.</li>
          <li>Planifier un appel de qualification suite au salon.</li>
        </ol>
      </div>
    </div>
  </section>

  <p v-else>Prospect introuvable ou données incomplètes.</p>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProspectsStore } from '@/store/prospectsStore'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useProspectsStore()

const id = parseInt(route.params.id)

// On suppose que getProspectById retourne l'objet complet { contact, interactions, scores }
const prospectData = store.getProspectById(id)

// Utiliser un `computed` si le store est réactif (ce qui est le cas avec Pinia)
const prospect = computed(() => prospectData)

/**
 * Fonction utilitaire pour formater les dates GMT
 * @param {string} dateString
 */
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    // Exemple de format : "13 Nov. 2025 à 13:04"
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return dateString;
  }
}

function handleScoreClick() {
  // Logique pour l'action "Scorer"
  console.log("Action Scorer cliquée pour le contact " + id);
  // Ajoutez ici la logique pour ouvrir une modale de scoring, par exemple
}

</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables';

.prospect-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
  padding: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 1.8rem;
      font-weight: 700;
      color: variables.$gray-01;
    }
    p {
      color: variables.$gray-04;
      margin-top: 0.3rem;
      font-size: 0.95rem;
    }

    .prospects__cta {
      display: flex;
      gap: 0.8rem;
    }
  }

  &__grid {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;

    .card {
      background: variables.$background;
      border-radius: 8px;
      padding: 1rem 1.2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      transition: transform 0.2s ease;

      h3 {
        font-size: 1.5rem;
        color: variables.$gray-01;
        margin-bottom: 0.4rem;
      }

      p {
        font-size: 1rem;
        color: variables.$gray-02;
        &.__sub {
          font-size: 0.85rem;
          color: variables.$gray-03;
          margin-top: 0.2rem;
        }
      }
      a {
        color: variables.$primary; /* ou une couleur de lien appropriée */
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>