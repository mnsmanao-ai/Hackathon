<template>
  <section v-if="prospect" class="prospect-detail">
    <header class="prospect-detail__header">
      <div class="prospects__head">
        <h2>{{ prospect.company }}</h2>
        <p>Contact : {{ prospect.contact }} · Score : <strong>{{ prospect.score }}</strong></p>
      </div>

      <div class="prospects__cta">
        <button class="btn btn__secondary" @click="router.push('/prospects')">← Retour</button>
        <button class="btn btn__primary" @click="">Scorer</button>
      </div>
    </header>

    <div class="prospect-detail__grid">
      <div class="card">
        <h3>Informations</h3>
        <p><strong>Email :</strong>   <a :href="`mailto:${prospect.email}`">{{ prospect.email }}</a></p>
        <p><strong>Téléphone :</strong> {{ prospect.phone }}</p>
        <p><strong>Adresse :</strong> {{ prospect.address }}</p>
        <p><strong>Secteur :</strong> {{ prospect.sector }}</p>
      </div>

      <div class="card">
        <h3>Historique</h3>
        <ul>
          <li v-for="(item, index) in prospect.history" :key="index">
            <strong>{{ item.date }}</strong> — {{ item.event }}
            <span v-if="item.note"> ({{ item.note }})</span>
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

const route = useRoute()
const router = useRouter()
const store = useProspectsStore()

const id = parseInt(route.params.id)
const prospect = store.getProspectById(id)
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
