<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'

const value = ref(undefined)
const unit = ref({ label: 'kW', toKW: 1 })

const units = [
  { label: 'kW', toKW: 1 },
  { label: 'BTU/h', toKW: 0.000293071 },
  { label: 'kcal/h', toKW: 0.001163 },
  { label: 'TR', toKW: 3.5169 }
]

const inKW = computed(() => {
  if (value.value === undefined || value.value === null) return null
  return value.value * unit.value.toKW
})

const results = computed(() => {
  if (inKW.value === null) return null
  return units.map((u) => ({
    label: u.label,
    result: inKW.value / u.toKW
  }))
})
</script>

<template>
  <CalculatorLayout
    title="Toneladas de Refrigeración"
    subtitle="Convierte entre kW, BTU/h, kcal/h y TR"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Valor a convertir</template>
        <template #content>
          <div class="flex gap-3 mt-3">
            <FloatLabel variant="on" class="flex-1">
              <InputNumber
                id="refr_value"
                v-model="value"
                :min-fraction-digits="0"
                :max-fraction-digits="6"
                fluid
              />
              <label for="refr_value">Potencia</label>
            </FloatLabel>
            <Select v-model="unit" :options="units" optionLabel="label" class="min-w-28" />
          </div>
        </template>
      </Card>
    </template>
    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultados</template>
        <template #content>
          <div v-if="results" class="grid grid-cols-1 gap-3 mt-3">
            <div
              v-for="r in results"
              :key="r.label"
              class="flex justify-between items-center p-3 bg-surface-100 dark:bg-surface-800 rounded-md"
            >
              <span>{{ r.label }}</span>
              <b>{{ r.result.toFixed(4) }}</b>
            </div>
          </div>
          <p v-else class="text-surface-400 mt-3">Introduce un valor para ver la conversión.</p>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>
