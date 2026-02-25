<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'

import { calcPipeFlow, calcEquipmentFlow, checkFlow } from '@/logic/caudalAgua.js'

// Izquierda: capacidad de tubería
const velocity = ref(1.5)
const diameter = ref(200)

// Derecha: caudal nominal del equipo
const power = ref(500)
const deltaT = ref(5)
const ce = ref(1)

const pipeFlow = computed(() => {
  if (!velocity.value || !diameter.value) return null
  return calcPipeFlow(velocity.value, diameter.value)
})

const equipmentFlow = computed(() => {
  if (!power.value || !deltaT.value || !ce.value) return null
  return calcEquipmentFlow(power.value, deltaT.value, ce.value)
})

const check = computed(() => {
  if (pipeFlow.value === null || equipmentFlow.value === null) return null
  return checkFlow(pipeFlow.value, equipmentFlow.value)
})
</script>

<template>
  <CalculatorLayout
    title="Cálculo de Caudal de Agua en Tuberías"
    subtitle="Comprueba si el diámetro de tubería es suficiente para la demanda del equipo"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Parámetros</template>
        <template #content>
          <div class="grid grid-cols-1 gap-6 mt-3">
            <div>
              <p class="text-sm font-semibold mb-3">Tubería</p>
              <div class="grid grid-cols-1 gap-3">
                <InputGroup>
                  <FloatLabel variant="on">
                    <InputNumber
                      id="velocity"
                      v-model="velocity"
                      :min="0.1"
                      :max="2"
                      :min-fraction-digits="1"
                      :max-fraction-digits="2"
                      fluid
                    />
                    <label for="velocity">Velocidad del agua</label>
                  </FloatLabel>
                  <InputGroupAddon class="min-w-16">m/s</InputGroupAddon>
                </InputGroup>
                <p class="text-xs text-surface-400">
                  Se aconseja 1,5 m/s (máx. 2 m/s)
                </p>
                <InputGroup>
                  <FloatLabel variant="on">
                    <InputNumber
                      id="diameter"
                      v-model="diameter"
                      :min="1"
                      :min-fraction-digits="0"
                      :max-fraction-digits="1"
                      fluid
                    />
                    <label for="diameter">Diámetro interior</label>
                  </FloatLabel>
                  <InputGroupAddon class="min-w-16">mm</InputGroupAddon>
                </InputGroup>
              </div>
            </div>

            <div>
              <p class="text-sm font-semibold mb-3">Equipo</p>
              <div class="grid grid-cols-1 gap-3">
                <InputGroup>
                  <FloatLabel variant="on">
                    <InputNumber
                      id="power"
                      v-model="power"
                      :min="0"
                      :min-fraction-digits="0"
                      :max-fraction-digits="1"
                      fluid
                    />
                    <label for="power">Potencia térmica</label>
                  </FloatLabel>
                  <InputGroupAddon class="min-w-16">kW</InputGroupAddon>
                </InputGroup>
                <InputGroup>
                  <FloatLabel variant="on">
                    <InputNumber
                      id="deltaT"
                      v-model="deltaT"
                      :min="0.1"
                      :min-fraction-digits="0"
                      :max-fraction-digits="1"
                      fluid
                    />
                    <label for="deltaT">Delta T (ΔT)</label>
                  </FloatLabel>
                  <InputGroupAddon class="min-w-16">°C</InputGroupAddon>
                </InputGroup>
                <InputGroup>
                  <FloatLabel variant="on">
                    <InputNumber
                      id="ce"
                      v-model="ce"
                      :min="0.1"
                      :min-fraction-digits="0"
                      :max-fraction-digits="3"
                      fluid
                    />
                    <label for="ce">Calor específico (Ce)</label>
                  </FloatLabel>
                  <InputGroupAddon class="min-w-24">kcal/kg·°C</InputGroupAddon>
                </InputGroup>
                <p class="text-xs text-surface-400">
                  Ce = 1 para agua sin tratar. ΔT normalmente 5 °C.
                </p>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </template>

    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultado</template>
        <template #content>
          <div class="grid grid-cols-1 gap-3 mt-3">
            <div
              class="flex justify-between items-center p-3 bg-surface-100 dark:bg-surface-800 rounded-md"
            >
              <span class="text-sm text-surface-500">Caudal máximo de tubería</span>
              <span class="font-semibold">
                {{ pipeFlow !== null ? pipeFlow.toFixed(2) + ' m³/h' : '—' }}
              </span>
            </div>
            <div
              class="flex justify-between items-center p-3 bg-surface-100 dark:bg-surface-800 rounded-md"
            >
              <span class="text-sm text-surface-500">Caudal nominal del equipo</span>
              <span class="font-semibold">
                {{ equipmentFlow !== null ? equipmentFlow.toFixed(2) + ' m³/h' : '—' }}
              </span>
            </div>

            <div
              v-if="check !== null"
              class="flex justify-between items-center p-4 rounded-md border-2 mt-2"
              :class="
                check === 'CUMPLE'
                  ? 'border-green-500 bg-green-50 dark:bg-green-950'
                  : 'border-red-500 bg-red-50 dark:bg-red-950'
              "
            >
              <span class="font-semibold text-sm">
                {{ check === 'CUMPLE' ? 'La tubería es suficiente' : 'Tubería insuficiente' }}
              </span>
              <span
                class="text-xl font-bold"
                :class="check === 'CUMPLE' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
              >
                {{ check }}
              </span>
            </div>
          </div>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>
