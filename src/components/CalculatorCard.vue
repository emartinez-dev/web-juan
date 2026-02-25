<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

const props = defineProps({
  title: String,
  subtitle: String,
  description: String,
  imageUrl: String,
  url: String
})
</script>

<template>
  <Card class="h-full cursor-pointer">
    <template v-if="imageUrl" #header>
      <img :src="imageUrl" :alt="title" class="w-full h-48 object-cover rounded-t-[6px]" />
    </template>
    <template #title>{{ title }}</template>
    <template #subtitle>{{ subtitle }}</template>
    <template #content>
      <p class="m-0">{{ description }}</p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Abrir calculadora" class="w-full" @click="$router.push(props.url)" />
      </div>
    </template>
  </Card>
</template>

<style scoped>
@reference "../assets/tailwind.css";
:deep(.p-card-body) {
  @apply flex flex-col h-full;
}
:deep(.p-card-content) {
  @apply flex-1;
}
</style>
