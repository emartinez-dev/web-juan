<script setup>
import { ref, onMounted } from 'vue'

const year = new Date().getFullYear()
const isDark = ref(false)

function initDarkMode() {
  const stored = localStorage.getItem('darkMode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = stored !== null ? stored === 'true' : prefersDark
  document.documentElement.classList.toggle('dark', isDark.value)
}

function toggleDarkMode() {
  isDark.value = document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', String(isDark.value))
}

onMounted(initDarkMode)
</script>

<template>
  <main class="min-h-screen flex flex-col">
    <nav class="bg-primary-900 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-3">
            <img
              src="/Imagen2.png"
              alt="Logo Frikigoristas"
              class="w-12 h-12 rounded-full cursor-pointer"
              @click="$router.push('/')"
            />
            <span class="text-xl font-semibold text-gray-100">Frikigoristas</span>
          </div>
          <button
            class="text-gray-100 hover:text-white p-2 rounded-md transition-colors"
            @click="toggleDarkMode"
            aria-label="Toggle dark mode"
          >
            <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-xl" />
          </button>
        </div>
      </div>
    </nav>
    <div class="p-6 max-w-screen-xl m-auto flex-1 w-full">
      <RouterView />
    </div>
    <footer class="bg-primary-900 text-gray-400 text-center py-4 text-sm">
      © {{ year }} Frikigoristas
    </footer>
  </main>
</template>

<style>
@reference "./assets/tailwind.css";
body {
  @apply h-full min-w-full bg-surface-100 dark:bg-surface-950;
}
</style>
