<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProspectsStore } from '@/store/prospectsStore.js'
import { getContacts } from '@/api/contacts.js'

const router = useRouter()
const prospectsStore = useProspectsStore()
const { prospects } = storeToRefs(prospectsStore)

function goToDetail(id) {
  prospectsStore.selectProspect(id)
  router.push(`/prospects/${id}`)
}

// --- Pagination ---
const currentPage = ref(1)
const itemsPerPage = ref(10)

const totalPages = computed(() => {
  return Math.ceil(prospects.value.length / itemsPerPage.value)
})

const paginatedProspects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return prospects.value.slice(start, end)
})

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <div class="prospects">
    <header class="prospects__header">
      <div class="prospects__head">
        <h2>Prospects</h2>
        <p>Ensemble des contacts</p>
      </div>

      <div class="prospects__cta">
        <button class="btn btn__secondary">Ajouter un prospect</button>
        <button class="btn btn__primary" @click="getContacts">Scorer</button>
      </div>
    </header>

    <div class="prospects__content">
      <table>
        <thead>
        <tr>
          <th>Nom</th>
          <th>Entreprise</th>
          <th>Source</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Score IA</th>
          <th>Dernière interaction</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="p in paginatedProspects"
            :key="p.id"
            @click="goToDetail(p.id)"
            class="prospect-row"
        >
          <td>{{ p.lastname + " " + p.firstname }}</td>
          <td>{{ p.company_id }}</td>
          <td>{{ p.source }}</td>
          <td>{{ p.email }}</td>
          <td>{{ p.phone }}</td>
          <td><span class="score">{{ p.last_score }}</span></td>
          <td>{{ p.updated_at }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="prospects__footer">
      <p>Affichage de {{ (currentPage-1)*itemsPerPage + 1 }} à
        {{ Math.min(currentPage*itemsPerPage, prospects.length) }} sur {{ prospects.length }} prospects</p>
      <div class="pagination">
        <button class="btn btn__secondary" @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <button class="btn btn__secondary" @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
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
    .prospects__cta {
      display: flex;
      gap: 0.8rem;
    }
  }

  &__content {
    margin-top: 1.5rem;

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 15px;

      .score {
        color: variables.$red;
      }

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

        &:hover {
          cursor: pointer;
        }
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