<template>
  <div class="dashboard">
    <header class="dashboard__header">
      <h2>Tableau de bord</h2>
      <p>Vue d’ensemble de votre activité commerciale</p>
    </header>

    <!-- Cards dynamiques -->
    <section class="cards">
      <div class="card">
        <div class="card__title">Prospects actifs</div>
        <div class="card__value">{{ prospectsActifs }}</div>
        <div class="card__sub">{{ variationActifs }}</div>
      </div>
      <div class="card">
        <div class="card__title">Taux de conversion</div>
        <div class="card__value">{{ tauxConversion }}%</div>
        <div class="card__sub">Basé sur last_score ≥ 50</div>
      </div>
      <div class="card">
        <div class="card__title">Ventes mensuelles</div>
        <div class="card__value">{{ ventesMensuelles }}</div>
        <div class="card__sub">Objectif : 150</div>
      </div>
      <div class="card">
        <div class="card__title">Relances en attente</div>
        <div class="card__value">{{ relancesEnAttente }}</div>
        <div class="card__sub">{{ relancesEnAttente ? relancesEnAttente + ' urgentes' : '' }}</div>
      </div>
    </section>

    <div class="dashboard__content">
      <!-- Graphiques -->
      <div class="panel">
        <div class="panel__header">
          <h3>Performance commerciale</h3>
          <span>Période : Octobre - Novembre 2025</span>
        </div>
        <canvas ref="chartCanvas" class="chart-canvas"></canvas>
      </div>

      <!-- Activités récentes -->
      <div class="panel">
        <div class="panel__header">
          <h3>Activités récentes</h3>
          <span>Mises à jour automatiques</span>
        </div>
        <ul class="timeline">
          <li v-for="activity in activitesRecentes" :key="activity.id_interaction">
            <strong>{{ getCompany(activity.contact_id) }}</strong> — {{ activity.subject || 'Mise à jour' }}
            <span>{{ formatDate(activity.date_interetaction) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import { useProspectsStore } from '@/store/prospectsStore';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const chartCanvas = ref(null);

const store = useProspectsStore();

// Charger les prospects si nécessaire
onMounted(async () => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Nov 1', 'Nov 8', 'Nov 15'],
        datasets: [{
          label: 'Ventes',
          data: [12, 19, 14, 17, 23, 18, 25],
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: { display: true, title: { display: true, text: 'Date' } },
          y: { display: true, title: { display: true, text: 'Nombre de ventes' }, beginAtZero: true }
        }
      }
    });
  }

  if (!store.prospects.length) {
    await store.loadProspects();
  }
});

// Prospects actifs
const prospectsActifs = computed(() => store.prospects.filter(p => p.status_interaction !== 'Client actif').length);
const variationActifs = computed(() => '+12% ce mois'); // placeholder, tu peux calculer la vraie variation

// Taux de conversion
const tauxConversion = computed(() => {
  const ventes = store.prospects.filter(p => p.last_score >= 50).length;
  return store.prospects.length ? ((ventes / store.prospects.length) * 100).toFixed(1) : 0;
});

// Ventes mensuelles
const ventesMensuelles = computed(() => {
  const now = new Date();
  return store.prospects.filter(p => {
    const date = new Date(p.created_at);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
});

// Relances en attente
const relancesEnAttente = computed(() => store.prospects.filter(p => p.status_interaction === 'En attente').length);

// Activités récentes (triées par date décroissante)
const activitesRecentes = computed(() => {
  const interactions = store.prospects.flatMap(p => p.interactions || []);
  return interactions.sort((a, b) => new Date(b.date_interetaction) - new Date(a.date_interetaction)).slice(0, 5);
});

// Fonction utilitaire pour récupérer le nom de la société
const getCompany = (id) => {
  const p = store.prospects.find(p => p.id === id);
  return p ? p.firstname + ' ' + p.lastname : 'Prospect inconnu';
}

// Formater la date
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
}
</script>


<style lang="scss" scoped>
@use '@/assets/styles/variables';

.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  &__header {
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
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;

    .card {
      background: variables.$background;
      border-radius: 8px;
      padding: 1rem 1.2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-3px);
      }

      &__title {
        font-size: 1.2rem;
        color: variables.$gray-01;
        margin-bottom: 0.4rem;
      }
      &__value {
        font-size: 1.6rem;
        font-weight: 700;
        color: variables.$red;
      }
      &__sub {
        font-size: 0.85rem;
        color: variables.$gray-03;
        margin-top: 0.2rem;
      }
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;

    .panel {
      background: variables.$background;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 1rem;

        h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }
        span {
          font-size: 0.85rem;
          color: variables.$gray-03;
        }
      }

      .chart-placeholder {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed variables.$gray-03;
        border-radius: 8px;
        color: variables.$gray-01;
        background: variables.$white;
      }

      .timeline {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 0.6rem 0;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;

          strong {
            color: variables.$dark-soft;
          }

          span {
            font-size: 0.8rem;
            color: #999;
          }

          &:last-child {
            border: none;
          }
        }
      }
    }
  }

  @media (max-width: 900px) {
    &__content {
      grid-template-columns: 1fr;
    }
  }
}
</style>
