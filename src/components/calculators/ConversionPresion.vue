<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'

const value = ref(undefined)
const unit = ref({ label: 'bar', toBar: 1 })

const units = [
  { label: 'bar', toBar: 1 },
  { label: 'psi', toBar: 0.0689476 },
  { label: 'kPa', toBar: 0.01 },
  { label: 'MPa', toBar: 10 }
]

const inBar = computed(() => {
  if (value.value === undefined || value.value === null) return null
  return value.value * unit.value.toBar
})

const results = computed(() => {
  if (inBar.value === null) return null
  return units.map((u) => ({
    label: u.label,
    result: inBar.value / u.toBar
  }))
})
</script>

<template>
  <CalculatorLayout
    title="Conversión de Presiones"
    subtitle="Convierte entre bar, psi, kPa y MPa"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Valor a convertir</template>
        <template #content>
          <div class="flex gap-3 mt-3">
            <FloatLabel variant="on" class="flex-1">
              <InputNumber
                id="pres_value"
                v-model="value"
                :min-fraction-digits="0"
                :max-fraction-digits="6"
                fluid
              />
              <label for="pres_value">Presión</label>
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
