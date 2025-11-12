<script setup>

</script>

<template>
  <div class="prospects">
    <header class="prospects__header">
      <div class="prospects__head">
        <h2>Prospects</h2>
        <p>Ensemble des contacts</p>
      </div>

      <div class="prospects__cta">

        <button class="btn btn__primary">
          <i class="icon">+</i>
          Ajouter un prospect</button>
      </div>
    </header>

    <div class="prospects__content">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Entreprise</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Statut</th>
            <th>Score IA</th>
            <th>Dernière activité</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jean Dupont</td>
            <td>Dupont SARL</td>
            <td>dupont.sarl@gmail.com</td>
            <td>+33 6 12 34 56 78</td>
            <td>Contacté</td>
            <td>85</td>
            <td>2024-06-15</td>
          </tr>
          <tr>
            <td>Jean Dupont</td>
            <td>Dupont SARL</td>
            <td>dupont.sarl@gmail.com</td>
            <td>+33 6 12 34 56 78</td>
            <td>Contacté</td>
            <td>85</td>
            <td>2024-06-15</td>
          </tr><tr>
            <td>Jean Dupont</td>
            <td>Dupont SARL</td>
            <td>dupont.sarl@gmail.com</td>
            <td>+33 6 12 34 56 78</td>
            <td>Contacté</td>
            <td>85</td>
            <td>2024-06-15</td>
          </tr><tr>
            <td>Jean Dupont</td>
            <td>Dupont SARL</td>
            <td>dupont.sarl@gmail.com</td>
            <td>+33 6 12 34 56 78</td>
            <td>Contacté</td>
            <td>85</td>
            <td>2024-06-15</td>
          </tr><tr>
            <td>Jean Dupont</td>
            <td>Dupont SARL</td>
            <td>dupont.sarl@gmail.com</td>
            <td>+33 6 12 34 56 78</td>
            <td>Contacté</td>
            <td>85</td>
            <td>2024-06-15</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination could go here -->
    </div>

    <div class="prospects__footer">
      <p>Affichage de 1 à 5 sur 50 prospects</p>
      <div class="pagination">
        <button class="btn btn__secondary">Précédent</button>
        <button class="btn btn__secondary">Suivant</button>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@use '@/assets/styles/variables';

.prospects {
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
  }

  &__content {
    margin-top: 1.5rem;

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 15px;

      th, td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid variables.$border;
      }

      th {
        background-color: variables.$background;
        color: variables.$gray-01;
        font-weight: 600;
      }

      tr {
        color: variables.$gray-04;
        background-color: variables.$gray-06;
      }

      tr:nth-child(odd) {
        background-color: variables.$gray-07;
      }

      tbody tr:hover {
        background-color: variables.$red-soft;
      }
    }


  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    p {
      color: variables.$gray-04;
      font-size: 0.9rem;
    }

    .pagination {
      display: flex;
      gap: 0.5rem;
    }
  }
}

</style>