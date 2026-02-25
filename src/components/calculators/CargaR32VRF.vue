<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'

import { calcVRF32Charge, VRF_R32_PIPES } from '@/logic/cargaR32VRF.js'

const metersMap = ref(Object.fromEntries(VRF_R32_PIPES.map((p) => [p.key, undefined])))
const interiorPowerW = ref(undefined)

const result = computed(() => {
  const power = interiorPowerW.value ?? 0
  const hasAnyInput =
    power > 0 || VRF_R32_PIPES.some((p) => metersMap.value[p.key])
  if (!hasAnyInput) return null
  return calcVRF32Charge(
    Object.fromEntries(VRF_R32_PIPES.map((p) => [p.key, metersMap.value[p.key] ?? 0])),
    power
  )
})
</script>

<template>
  <CalculatorLayout
    title="Carga Adicional VRF R-32"
    subtitle="Carga adicional por tubería de líquido y potencia interior instalada"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Datos de la instalación</template>
        <template #content>
          <div class="grid grid-cols-1 gap-4 mt-3">
            <div>
              <p class="text-sm font-semibold mb-3">Tubería de líquido — metros por diámetro</p>
              <div class="grid grid-cols-1 gap-2">
                <InputGroup v-for="pipe in VRF_R32_PIPES" :key="pipe.key">
                  <InputGroupAddon class="min-w-36 justify-start text-xs font-mono">
                    {{ pipe.label }}
                  </InputGroupAddon>
                  <InputNumber
                    v-model="metersMap[pipe.key]"
                    :min="0"
                    :min-fraction-digits="0"
                    :max-fraction-digits="1"
                    placeholder="0"
                    fluid
                  />
                  <InputGroupAddon class="min-w-10">m</InputGroupAddon>
                </InputGroup>
              </div>
            </div>

            <div>
              <p class="text-sm font-semibold mb-3">Potencia interior instalada</p>
              <InputGroup>
                <FloatLabel variant="on">
                  <InputNumber
                    id="interior_power"
                    v-model="interiorPowerW"
                    :min="0"
                    :min-fraction-digits="0"
                    :max-fraction-digits="0"
                    fluid
                  />
                  <label for="interior_power">Potencia total</label>
                </FloatLabel>
                <InputGroupAddon class="min-w-14">W</InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </template>
      </Card>
    </template>

    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultado</template>
        <template #content>
          <div v-if="result" class="grid grid-cols-1 gap-3 mt-3">
            <div>
              <p class="text-xs text-surface-500 mb-2 font-semibold uppercase tracking-wide">
                Desglose por tubería
              </p>
              <div
                v-for="pipe in result.pipes"
                :key="pipe.key"
                class="flex justify-between items-center py-1 text-sm border-b border-surface-100 dark:border-surface-800"
              >
                <span class="font-mono text-xs">{{ pipe.label }}</span>
                <span>{{ pipe.grams.toFixed(1) }} g</span>
              </div>
            </div>

            <div
              class="flex justify-between items-center p-3 bg-surface-100 dark:bg-surface-800 rounded-md text-sm"
            >
              <span class="text-surface-500">Subtotal tuberías</span>
              <span class="font-semibold">{{ result.pipeGrams.toFixed(1) }} g</span>
            </div>
            <div
              class="flex justify-between items-center p-3 bg-surface-100 dark:bg-surface-800 rounded-md text-sm"
            >
              <span class="text-surface-500">Carga por potencia interior</span>
              <span class="font-semibold">{{ result.powerGrams.toFixed(1) }} g</span>
            </div>

            <div
              class="flex justify-between items-center p-4 rounded-md border-2 border-primary-500 dark:border-primary-400"
            >
              <span class="font-bold">TOTAL</span>
              <div class="text-right">
                <p class="text-xl font-bold text-primary-600 dark:text-primary-400">
                  {{ result.totalGrams.toFixed(0) }} g
                </p>
                <p class="text-sm text-surface-500">{{ result.totalKg.toFixed(3) }} kg</p>
              </div>
            </div>
          </div>
          <p v-else class="text-surface-400 mt-3 text-sm">
            Introduce los datos de la instalación para calcular la carga adicional.
          </p>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>
