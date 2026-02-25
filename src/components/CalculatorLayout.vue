<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>

<template>
  <div>
    <div class="mb-6">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline text-sm"
      >
        <i class="pi pi-arrow-left text-xs" />
        Calculadoras
      </RouterLink>
      <h1 class="text-2xl font-bold mt-2 text-surface-800 dark:text-surface-50">{{ title }}</h1>
      <p v-if="subtitle" class="text-surface-500 mt-1 text-sm">{{ subtitle }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <slot name="inputs" />
      <slot name="results" />
    </div>
  </div>
</template>
