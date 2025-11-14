<template>
  <div class="dashboard">
    <header class="dashboard__header">
      <h2>Support et Crédits</h2>
      <p>Remerciements et informations de support</p>
    </header>

    <!-- Cards avec infos rapides -->
    <section class="cards">
      <div class="card">
        <div class="card__title">Support technique</div>
        <div class="card__value">📞 24/7</div>
        <div class="card__sub">Email et chat disponibles</div>
      </div>
      <div class="card">
        <div class="card__title">Documentation</div>
        <div class="card__value">📚 12 guides</div>
        <div class="card__sub">Guides et tutoriels</div>
      </div>
      <div class="card">
        <div class="card__title">FAQ</div>
        <div class="card__value">❓ 35 réponses</div>
        <div class="card__sub">Questions fréquentes</div>
      </div>
      <div class="card">
        <div class="card__title">Contact direct</div>
        <div class="card__value">✉️ email@support.com</div>
        <div class="card__sub">Réponse sous 24h</div>
      </div>
    </section>

    <div class="dashboard__content">
      <!-- Panel Crédits -->
      <div class="panel">
        <div class="panel__header">
          <h3>Crédits</h3>
          <span>Contributeurs principaux</span>
        </div>
        <ul class="timeline">
          <li v-for="name in noms" :key="name">
            <strong>{{ name }}</strong> — Contribution majeure au projet
          </li>
        </ul>
      </div>

      <!-- Panel Support -->

      <div class="panel">
        <div class="panel__header">
          <h3>Hackaton code4sud</h3>
          <span>Projet réalisé dans le cadre du Hackaton organisé par code4sud</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Liste des contributeurs fictifs
const noms = ref(['XAXA Lucie', 'BERNARD Pierre', 'DELGADO Manao', 'NAGHMOUCHI Riyad', 'HANJAF Achraf']);
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
        height: 180px;
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
