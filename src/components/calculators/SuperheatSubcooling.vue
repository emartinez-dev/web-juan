<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'
import SelectButton from 'primevue/selectbutton'

const t_sat = ref(undefined)
const t_real = ref(undefined)
const mode = ref('superheat')

const modeOptions = [
  { label: 'Superheat', value: 'superheat' },
  { label: 'Subcooling', value: 'subcooling' }
]

const result = computed(() => {
  if (
    t_sat.value === undefined ||
    t_sat.value === null ||
    t_real.value === undefined ||
    t_real.value === null
  )
    return null
  return mode.value === 'superheat' ? t_real.value - t_sat.value : t_sat.value - t_real.value
})

const resultLabel = computed(() => (mode.value === 'superheat' ? 'Superheat' : 'Subcooling'))

const resultContext = computed(() => {
  if (result.value === null) return ''
  if (result.value > 0) return `${resultLabel.value} positivo: el sistema funciona correctamente.`
  if (result.value === 0) return 'El resultado es cero.'
  return `${resultLabel.value} negativo: verifica los datos de entrada.`
})
</script>

<template>
  <CalculatorLayout
    title="Superheat y Subcooling"
    subtitle="Calcula el recalentamiento o subenfriamiento del refrigerante"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Datos</template>
        <template #content>
          <div class="grid grid-cols-1 gap-4 mt-3">
            <SelectButton
              v-model="mode"
              :options="modeOptions"
              optionLabel="label"
              optionValue="value"
            />
            <InputGroup>
              <FloatLabel variant="on">
                <InputNumber
                  id="t_sat"
                  v-model="t_sat"
                  :min-fraction-digits="0"
                  :max-fraction-digits="2"
                  fluid
                />
                <label for="t_sat">Temperatura de saturación</label>
              </FloatLabel>
              <InputGroupAddon class="min-w-14">°C</InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <FloatLabel variant="on">
                <InputNumber
                  id="t_real"
                  v-model="t_real"
                  :min-fraction-digits="0"
                  :max-fraction-digits="2"
                  fluid
                />
                <label for="t_real">Temperatura real</label>
              </FloatLabel>
              <InputGroupAddon class="min-w-14">°C</InputGroupAddon>
            </InputGroup>
          </div>
        </template>
      </Card>
    </template>
    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultado</template>
        <template #content>
          <div v-if="result !== null" class="flex flex-col gap-4 mt-3">
            <div
              class="p-4 bg-surface-100 dark:bg-surface-800 rounded-md text-center"
            >
              <p class="text-surface-500 text-sm mb-1">{{ resultLabel }}</p>
              <p class="text-3xl font-bold">{{ result.toFixed(2) }} °C</p>
            </div>
            <p class="text-surface-500 text-sm">{{ resultContext }}</p>
          </div>
          <p v-else class="text-surface-400 mt-3">Introduce los valores para calcular.</p>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>
