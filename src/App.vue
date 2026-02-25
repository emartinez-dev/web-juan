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
    <nav
      class="sticky top-0 z-50 bg-white/75 dark:bg-surface-950/80 backdrop-blur-xl border-b border-black/5 dark:border-white/8"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <div
            class="flex items-center gap-2.5 cursor-pointer"
            @click="$router.push('/')"
          >
            <img
              src="/Imagen2.png"
              alt="Frikigoristas"
              class="w-8 h-8 rounded-xl shadow-sm object-cover"
            />
            <span class="font-semibold text-surface-900 dark:text-surface-50 tracking-tight">
              Frikigoristas
            </span>
          </div>
          <button
            class="w-8 h-8 flex items-center justify-center rounded-full bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
            @click="toggleDarkMode"
          >
            <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-sm" />
          </button>
        </div>
      </div>
    </nav>

    <div class="px-4 sm:px-6 lg:px-8 py-8 max-w-screen-xl mx-auto flex-1 w-full">
      <RouterView />
    </div>

    <footer class="border-t border-surface-200/60 dark:border-surface-800/60 py-5">
      <p class="text-center text-xs text-surface-400 dark:text-surface-600 tracking-wide">
        © {{ year }} Frikigoristas
      </p>
    </footer>
  </main>
</template>

<style>
@reference "./assets/tailwind.css";
body {
  @apply min-h-full min-w-full bg-surface-50 dark:bg-surface-950;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
}
</style>
