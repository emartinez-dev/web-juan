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
    imageUrl: '',
    url: 'co2'
  },
  {
    title: 'Conversión de Temperaturas',
    subtitle: 'De °C, °F y K',
    description: `Convierte instantáneamente entre grados Celsius, Fahrenheit y Kelvin.
                  Útil para interpretar datos de equipos con distintas escalas de temperatura.`,
    imageUrl: '',
    url: 'conversion-temperatura'
  },
  {
    title: 'Conversión de Presiones',
    subtitle: 'De bar, psi, kPa y MPa',
    description: `Convierte valores de presión entre las unidades más comunes: bar, psi,
                  kilopascales y megapascales.`,
    imageUrl: '',
    url: 'conversion-presion'
  },
  {
    title: 'Superheat y Subcooling',
    subtitle: 'Recalentamiento y subenfriamiento',
    description: `Calcula el superheat (recalentamiento) o el subcooling (subenfriamiento)
                  del refrigerante a partir de las temperaturas de saturación y real.`,
    imageUrl: '',
    url: 'superheat-subcooling'
  },
  {
    title: 'Toneladas de Refrigeración',
    subtitle: 'Potencia frigorífica',
    description: `Convierte la potencia frigorífica entre kW, BTU/h, kcal/h y toneladas
                  de refrigeración (TR).`,
    imageUrl: '',
    url: 'toneladas-refrigeracion'
  }
]
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-surface-800 dark:text-surface-50">Calculadoras</h1>
      <p class="text-surface-500 mt-2">
        Herramientas de cálculo para técnicos de climatización y refrigeración
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CalculatorCard
        v-for="calc in calculators"
        :key="calc.title"
        :title="calc.title"
        :subtitle="calc.subtitle"
        :description="calc.description"
        :image-url="calc.imageUrl"
        :url="calc.url"
      />
    </div>
  </div>
</template>
