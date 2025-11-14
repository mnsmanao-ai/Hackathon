<template>
  <section v-if="prospect" class="prospect-detail">
    <header class="prospect-detail__header">
      <div class="prospects__head">
        <h2>{{ prospect.company_id }}</h2>
        <p>Contact : {{ prospect.lastname + " " + prospect.firstname }} · Score : <strong>{{ prospect.score }}</strong></p>
      </div>

      <div class="prospects__cta">
        <button class="btn btn__secondary" @click="router.push('/prospects')">← Retour</button>
        <button class="btn btn__primary" @click="scorer">Scorer</button>
      </div>
    </header>

    <div class="prospect-detail__grid">
      <div class="card">
        <h3>Informations</h3>
        <p><strong>Email :</strong>   <a :href="`mailto:${prospect.email}`">{{ prospect.email }}</a></p>
        <p><strong>Téléphone :</strong> {{ prospect.phone }}</p>
        <p><strong>Source :</strong> {{ prospect.source }}</p>
        <p><strong>Tags :</strong> {{ prospect.tags }}</p>
        <p><strong>Status interaction :</strong> {{prospect.status_interaction}}</p>
      </div>

      <div class="card">
        <h3>Historique</h3>
        <ul>
          <li v-for="item in prospect.interactions" :key="item.contact_id">
            <a>{{ item.channel }}</a>
            <strong>{{ item.date_interetaction }}</strong> — {{ item.subject }}
            <span v-if="item.content"> ({{ item.content }})</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <h3>Actions recommandées (IA)</h3>
        <ol>
          <li v-for="(a, i) in prospect.actions" :key="i">{{ a }}</li>
        </ol>
      </div>
    </div>
  </section>

  <p v-else>Prospect introuvable.</p>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useProspectsStore } from '@/store/prospectsStore'

import {agentAnalyze} from "@/api/agent.js";
import { ref, onMounted } from "vue";

const route = useRoute()
const router = useRouter()
const store = useProspectsStore()

const id = parseInt(route.params.id)
const prospect = ref(null);

onMounted(async () => {
  // Si les prospects ne sont pas encore chargés, charge-les
  if (!store.prospects.length) {
    await store.loadProspects();
  }

  // Récupère le prospect depuis le store
  prospect.value = store.getProspectById(id);

  // Si introuvable, redirige
  if (!prospect.value) {
    await router.push("/prospects");
  }
});

function scorer() {
  agentAnalyze(prospect)
    .then(response => {
      // Mettre à jour le prospect avec les nouvelles données
      console.log(response)
      store.updateProspect(response)
    })
    .catch(error => {
      console.error('Erreur lors du scoring du prospect :', error)
    })
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
      }
      &__sub {
        font-size: 0.85rem;
        color: variables.$gray-03;
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
