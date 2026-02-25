<script setup>
defineProps({
  title: String,
  description: String,
  icon: String,
  url: String,
})
</script>

<template>
  <RouterLink
    :to="`/${url}`"
    class="group flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-md transition-all duration-200"
  >
    <div
      class="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-950 flex items-center justify-center"
    >
      <i :class="icon" class="text-primary-600 dark:text-primary-400 text-lg" />
    </div>
    <div class="flex-1 min-w-0">
      <p
        class="font-semibold text-surface-800 dark:text-surface-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight"
      >
        {{ title }}
      </p>
      <p class="text-sm text-surface-500 dark:text-surface-400 mt-1 leading-snug">
        {{ description }}
      </p>
    </div>
    <i
      class="pi pi-chevron-right flex-shrink-0 text-surface-300 dark:text-surface-600 group-hover:text-primary-400 transition-colors mt-0.5"
    />
  </RouterLink>
</template>
