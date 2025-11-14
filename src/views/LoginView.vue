<template>
  <section class="login-view">
    <h2 class="login-view__title">Connexion</h2>
    <p class="login-view__subtitle">Accédez à votre espace CRM Burostock</p>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">Adresse email</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="exemple@entreprise.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Votre mot de passe"
        />
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn__primary" :disabled="loading">
        <span v-if="loading" class="loader"></span>
        <span v-else>Se connecter</span>
      </button>

      <p class="login-form__register">
        Pas encore de compte ?
        <RouterLink to="/auth/register">Créer un compte</RouterLink>
      </p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true

  try {
    const res = await auth.login(email.value, password.value)
    if (res.success) {
      await router.push('/dashboard') // Redirige vers dashboard après login
    } else {
      errorMessage.value = res.message
    }
  } catch (err) {
    errorMessage.value = err.message || 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables';

.login-view {
  text-align: center;
  width: 100%;

  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-size: 1rem;
    color: variables.$gray-04;
    margin-bottom: 2rem;
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  text-align: left;

  .form-group {
    display: flex;
    flex-direction: column;
    label {
      font-size: 0.9rem;
      margin-bottom: 0.3rem;
      font-weight: 500;
    }
    input {
      padding: 0.7rem 0.9rem;
      border: 1px solid variables.$border;
      border-radius: 6px;
      font-size: 1rem;
      outline: none;
      transition: border 0.2s ease;

      &:focus {
        border-color: variables.$red;
      }
    }
  }

  .error-message {
    background: variables.$red-soft;
    color: variables.$red;
    padding: 0.7rem;
    border-radius: 6px;
    text-align: center;
    font-size: 0.9rem;
  }

  .btn {
    .loader {
      width: 18px;
      height: 18px;
      border: 2px solid #fff;
      border-top-color: transparent;
      border-radius: 50%;
      display: inline-block;
      animation: spin 0.8s linear infinite;
    }
  }

  &__register {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 1rem;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
