<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar__logo">
        <img src="@/assets/logo.jpg" alt="Burostock CRM" />
        <h1>BUROSTOCK</h1>
      </div>

      <nav class="sidebar__nav">
        <h3>Apps</h3>
        <RouterLink to="/dashboard" class="btn" active-class="active">
          <i class="icon">📊</i> Dashboard
        </RouterLink>
        <RouterLink to="/prospects" class="btn" active-class="active">
          <i class="icon">👥</i> Prospects
        </RouterLink>
        <!--
        <RouterLink to="/pipeline" class="btn" active-class="active">
          <i class="icon">📈</i> Pipeline
        </RouterLink>
        <RouterLink to="/analytics" class="btn" active-class="active">
          <i class="icon">📋</i> Analytics
        </RouterLink>

        <h3>Configuration</h3>
        <RouterLink to="/settings" class="btn" active-class="active">
          <i class="icon">⚙️</i> Paramètres
        </RouterLink>
        <h3>Admin</h3>
        <RouterLink to="/users" class="btn" active-class="active">
          <i class="icon">🧑‍💼</i> Utilisateurs
        </RouterLink>
        -->
      </nav>

      <div class="sidebar__footer">
        <RouterLink to="/support" class="btn">
          <i class="icon">💬</i> Credits & Support
        </RouterLink>
      </div>
    </aside>

    <!-- Main content -->
    <main class="main">
      <!-- Topbar -->
      <header class="topbar">
        <div class="topbar__burger" onclick="@toggleSidebar()">
          <i class="icon">☰</i>
        </div>
        <div class="topbar__search">
          <input type="text" placeholder="Rechercher un client..." v-model="search" />
        </div>
        <div class="topbar__user">
          <!--<img class="avatar" src="/avatar.png" alt="User" />-->
          <a class="username" @click="handleLogout">Se déconnecter</a>
        </div>
      </header>

      <!-- Page content -->
      <section class="content">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const search = ref('')

// logique du burger menu pour mobile
function toggleSidebar(){
  const sidebar = document.querySelector('.sidebar')
  if (sidebar.style.display === 'flex') {
    sidebar.style.display = 'none'
  } else {
    sidebar.style.display = 'flex'
  }
}

import { useAuthStore } from '@/store/authStore'

const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables';

.layout {
  display: flex;
  height: 100vh;
  background: variables.$background;
  color: variables.$gray-01;

  .sidebar {
    min-width: 250px;
    width: 15vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2);

    &__logo {
      color: variables.$red;
      display: flex;
      padding: .6rem 0;
      font-size: 1rem;
      font-weight: 700;
      text-align: center;
      align-items: center;
      justify-content: center;

      img {
        width: 3rem;
        height: auto;
      }
    }

    &__nav {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      gap: .4rem;

      h3 {
        margin: 1.6rem 0 0 0;
        font-size: 0.85rem;
        color: variables.$gray-04;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    &__footer {
      padding: 1rem;
      border-top: 1px solid variables.$border;
      .btn {
        color: variables.$gray-03;
        font-size: 0.9rem;
        &:hover {
          color: variables.$red;
        }
      }
    }

    @media (max-width: 1024px) {
      display: none;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      z-index: 1000;
    }
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;

    .topbar {
      background: variables.$background;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.8rem 2rem;

      &__burger {
        display: none;
        font-size: 1.5rem;
        cursor: pointer;

        @media (max-width: 1024px) {
          display: block;
        }
      }

      &__search input {
        border: none;
        padding: 0.6rem 1rem;
        border-radius: 8px;
        background: variables.$background-soft;
        width: 250px;
        outline: none;
        font-size: 0.95rem;
        transition: all 0.2s ease;

        &:focus {
          box-shadow: 0 0 0 2px variables.$red-soft;
        }
      }

      &__user {
        display: flex;
        align-items: center;
        gap: 0.6rem;

        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
        }
        .username {
          font-weight: 500;
          font-size: 0.95rem;
        }
      }
    }

    .content {
      flex: 1;
      padding: 2rem;
      overflow-y: auto;
      background: variables.$background-soft;
    }
  }
}
</style>
