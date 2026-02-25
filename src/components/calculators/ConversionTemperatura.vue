<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'

const value = ref(undefined)
const unit = ref({ label: '°C', value: 'C' })

const units = [
  { label: '°C', value: 'C' },
  { label: '°F', value: 'F' },
  { label: 'K', value: 'K' }
]

const celsius = computed(() => {
  if (value.value === undefined || value.value === null) return null
  if (unit.value.value === 'C') return value.value
  if (unit.value.value === 'F') return ((value.value - 32) * 5) / 9
  if (unit.value.value === 'K') return value.value - 273.15
  return null
})

const fahrenheit = computed(() => {
  if (celsius.value === null) return null
  return (celsius.value * 9) / 5 + 32
})

const kelvin = computed(() => {
  if (celsius.value === null) return null
  return celsius.value + 273.15
})

const hasResult = computed(() => celsius.value !== null)
</script>

<template>
  <CalculatorLayout
    title="Conversión de Temperaturas"
    subtitle="Convierte entre grados Celsius, Fahrenheit y Kelvin"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Valor a convertir</template>
        <template #content>
          <div class="flex gap-3 mt-3">
            <FloatLabel variant="on" class="flex-1">
              <InputNumber
                id="temp_value"
                v-model="value"
                :min-fraction-digits="0"
                :max-fraction-digits="6"
                fluid
              />
              <label for="temp_value">Temperatura</label>
            </FloatLabel>
            <Select v-model="unit" :options="units" optionLabel="label" class="min-w-24" />
          </div>
        </template>
      </Card>
    </template>
    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultados</template>
        <template #content>
          <div v-if="hasResult" class="grid grid-cols-1 gap-3 mt-3">
            <div
              class="flex justify-between items-center p-3 bg-surface-100 dark:bg-surface-800 rounded-md"
            >
              <span>Celsius</span>
              <b>{{ celsius.toFixed(4) }} °C</b>
            </div>
            <div
              class="flex justify-between items-center p-3 bg-surface-100 dark:bg-surface-800 rounded-md"
            >
              <span>Fahrenheit</span>
              <b>{{ fahrenheit.toFixed(4) }} °F</b>
            </div>
            <div
              class="flex justify-between items-center p-3 bg-surface-100 dark:bg-surface-800 rounded-md"
            >
              <span>Kelvin</span>
              <b>{{ kelvin.toFixed(4) }} K</b>
            </div>
          </div>
          <p v-else class="text-surface-400 mt-3">Introduce un valor para ver la conversión.</p>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>
