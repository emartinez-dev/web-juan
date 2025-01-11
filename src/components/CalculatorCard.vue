<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

const props = defineProps({
  title: String,
  subtitle: String,
  description: String,
  url: String
})
</script>

<template>
  <Card
    class="min-h-full flex flex-col"
    :pt="{ body: { class: 'min-h-full' }, content: { class: 'flex-1' } }"
  >
    <template #title>{{ title }}</template>
    <template #subtitle>{{ subtitle }}</template>
    <template #content>
      <p class="m-0 flex-1">{{ description }}</p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Abrir calculadora" class="w-full" @click="$router.push(props.url)" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.p-card-body {
  @apply min-h-full;
}
</style>
