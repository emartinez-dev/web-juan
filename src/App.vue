<script setup>
const year = new Date().getFullYear()
</script>
<template>
  <main class="min-h-screen flex flex-col">
    <nav class="bg-primary-900 shadow-sm">
      <div class="max-w-7xl mx-auto lg:mx-4 px-4 sm:px-6 lg:px-8">
        <div class="flex items-center sm:justify-between justify-start h-16">
          <div class="flex items-center space-x-3">
            <img
              src="/Imagen2.png"
              alt="Logo Frikigoristas"
              class="w-12 h-12 rounded-full"
              @click="$router.push('/')"
            />
            <span class="text-xl font-semibold text-gray-100">Frikigoristas</span>
          </div>
        </div>
      </div>
    </nav>
    <div class="p-6 max-w-screen-xl m-auto flex-1">
      <RouterView />
    </div>
  </main>
</template>
<style #scoped>
body {
  @apply h-full min-w-full bg-surface-100 dark:bg-surface-950;
}
</style>
