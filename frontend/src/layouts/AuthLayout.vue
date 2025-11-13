<template>
  <div class="auth-layout">
    <div class="auth-layout__left">
      <div class="brand">
        <h1>Burostock CRM</h1>
        <p>Gérez vos prospects et développez votre activité efficacement.</p>
      </div>
    </div>

    <div class="auth-layout__right">
      <main class="auth-container">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
// Pas de logique ici — le layout sert juste à afficher les pages enfants
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables';

.auth-layout {
  display: flex;
  height: 100vh;
  background: #f5f7fb;
  overflow: hidden;

  &__left {
    flex: 1.2;
    background: variables.$red;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    text-align: center;

    .brand {
      max-width: 380px;
      h1 {
        font-size: 2.4rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1rem;
        line-height: 1.5;
        opacity: 0.9;
      }
    }
  }

  &__right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .auth-container {
      background: variables.$background;
      padding: 3rem 3.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 420px;
      animation: fadeIn 0.3s ease;
    }
  }

  @media (max-width: 900px) {
    flex-direction: column;

    &__left {
      flex: none;
      height: 200px;
      padding: 1.5rem;
      h1 {
        font-size: 1.8rem;
      }
    }

    &__right {
      flex: 1;
      .auth-container {
        max-width: 90%;
        padding: 2rem;
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
