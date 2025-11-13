<template>
  <div class="dashboard">
    <header class="dashboard__header">
      <h2>Tableau de bord</h2>
      <p>Vue d’ensemble de votre activité commerciale</p>
    </header>

    <!-- cards principaux -->
    <section class="cards">
      <div class="card">
        <div class="card__title">Prospects actifs</div>
        <div class="card__value">324</div>
        <div class="card__sub">+12% ce mois</div>
      </div>
      <div class="card">
        <div class="card__title">Taux de conversion</div>
        <div class="card__value">18.7%</div>
        <div class="card__sub">+3 points</div>
      </div>
      <div class="card">
        <div class="card__title">Ventes mensuelles</div>
        <div class="card__value">142</div>
        <div class="card__sub">Objectif : 150</div>
      </div>
      <div class="card">
        <div class="card__title">Relances en attente</div>
        <div class="card__value">27</div>
        <div class="card__sub">5 urgentes</div>
      </div>
    </section>

    <div class="dashboard__content">
      <!-- Graphiques -->
      <div class="panel">
        <div class="panel__header">
          <h3>Performance commerciale</h3>
          <span>Période : Octobre - Novembre 2025</span>
        </div>

        <div class="chart-placeholder">
          <p>📊 Graphique à intégrer ici (API ou composant chart.js)</p>
        </div>
      </div>

      <!-- Activités récentes -->
      <div class="panel">
        <div class="panel__header">
          <h3>Activités récentes</h3>
          <span>Mises à jour automatiques</span>
        </div>
        <ul class="timeline">
          <li>
            <strong>Dupont SARL</strong> — Relance effectuée (email)
            <span>il y a 2h</span>
          </li>
          <li>
            <strong>Atelier Pro</strong> — Nouveau devis envoyé
            <span>il y a 5h</span>
          </li>
          <li>
            <strong>Immobat</strong> — Score IA mis à jour (+15)
            <span>hier</span>
          </li>
          <li>
            <strong>OfficeLine</strong> — Nouvelle fiche prospect
            <span>hier</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// Future: importer composant chart.js ou data API ici
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
