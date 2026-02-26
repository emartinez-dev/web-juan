<script setup>
import { ref, onMounted } from 'vue'

const year = new Date().getFullYear()
const isDark = ref(false)
const installPrompt = ref(null)
const showInstallBanner = ref(false)

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

async function installApp() {
  if (!installPrompt.value) return
  installPrompt.value.prompt()
  const { outcome } = await installPrompt.value.userChoice
  if (outcome === 'accepted') showInstallBanner.value = false
  installPrompt.value = null
}

function dismissBanner() {
  showInstallBanner.value = false
  localStorage.setItem('pwaInstallDismissed', 'true')
}

onMounted(() => {
  initDarkMode()
  if (localStorage.getItem('pwaInstallDismissed')) return
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    installPrompt.value = e
    showInstallBanner.value = true
  })
})
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

    <Transition name="slide-up">
      <div
        v-if="showInstallBanner"
        class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm"
      >
        <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-xl shadow-lg border border-black/5 dark:border-white/10">
          <img src="/Imagen2.png" alt="" class="w-9 h-9 rounded-xl flex-shrink-0 object-cover" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-surface-900 dark:text-surface-50 leading-tight">Instalar Frikigoristas</p>
            <p class="text-xs text-surface-500 dark:text-surface-400">Acceso rápido desde tu pantalla de inicio</p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button
              class="text-xs text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300 transition-colors px-1"
              @click="dismissBanner"
            >
              Ahora no
            </button>
            <button
              class="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950 hover:bg-primary-100 dark:hover:bg-primary-900 px-3 py-1.5 rounded-lg transition-colors"
              @click="installApp"
            >
              Instalar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<style>
@reference "./assets/tailwind.css";
body {
  @apply min-h-full min-w-full bg-surface-50 dark:bg-surface-950;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, 1rem);
}
</style>
