<script setup>
import CalculatorCard from '@/components/CalculatorCard.vue'

const calculators = [
  {
    title: 'Calculadora Ley Gay-Lussac',
    subtitle: 'Relación entre presión y temperatura',
    description: `Esta calculadora se utiliza para resolver problemas relacionados con 
                  la ley de Gay-Lussac, que describe la relación entre la presión y la temperatura 
                  de un gas ideal, manteniendo constante el volumen y la cantidad de gas`,
    imageUrl: '',
    url: 'gay-lussac'
  },
  {
    title: 'Equivalencias Refrigerantes y CO₂',
    subtitle: 'Relación gases refrigerantes - CO₂',
    description: `Una calculadora de equivalencia de masa entre gases refrigerantes y CO₂ sirve 
                  para comparar el impacto ambiental de diferentes gases refrigerantes en toneladas 
                  de CO₂`,
    imageUrl: 'co2.avif',
    url: 'co2'
  }
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    <CalculatorCard
      v-for="calc in calculators"
      :key="calc.title"
      :title="calc.title"
      :subtitle="calc.subtitle"
      :description="calc.description"
      :image-url="calc.imageUrl"
      :url="calc.url"
    >
    </CalculatorCard>
  </div>
</template>

<style scoped></style>
