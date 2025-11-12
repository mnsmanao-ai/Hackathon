<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Imports des layouts globaux
import DefaultLayout from '@/layouts/DefaultLayout.vue'

// Récupération de la route actuelle
const route = useRoute()

// Définir le layout selon la meta de la route
const layout = computed(() => {
  const layoutName = route.meta.layout || 'default'
  switch (layoutName) {
    default:
      return DefaultLayout
  }
})
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
@import '@/assets/styles/main.scss';

</style>
