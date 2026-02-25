<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'

import { calcCargaRac, RAC_RANGES } from '@/logic/cargaR32Rac.js'

const lengths = ref({ high: undefined, low: undefined })

const results = computed(() => {
  const out = {}
  for (const range of ['high', 'low']) {
    const len = lengths.value[range]
    if (len !== undefined && len !== null) {
      out[range] = calcCargaRac(len, range)
    }
  }
  return out
})
</script>

<template>
  <CalculatorLayout
    title="Carga Adicional R-32 — RAC / LCAC"
    subtitle="Carga de gas refrigerante adicional según longitud de tubería de líquido"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Longitud total de tubería de líquido</template>
        <template #content>
          <p class="text-surface-500 text-sm mt-2 mb-4">
            Introduce los metros de tubería según la gama de potencia de tu equipo.
          </p>

          <div class="grid grid-cols-1 gap-6">
            <div v-for="(cfg, range) in RAC_RANGES" :key="range" class="flex flex-col gap-2">
              <p class="font-semibold text-sm">{{ cfg.label }}</p>
              <p class="text-surface-400 text-xs">Tubería líquido {{ cfg.tube }}</p>
              <InputGroup>
                <FloatLabel variant="on">
                  <InputNumber
                    :id="`len_${range}`"
                    v-model="lengths[range]"
                    :min="0"
                    :min-fraction-digits="0"
                    :max-fraction-digits="1"
                    fluid
                  />
                  <label :for="`len_${range}`">Longitud total</label>
                </FloatLabel>
                <InputGroupAddon class="min-w-14">m</InputGroupAddon>
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
          <div
            v-if="Object.keys(results).length"
            class="grid grid-cols-1 gap-4 mt-3"
          >
            <div
              v-for="(res, range) in results"
              :key="range"
              class="rounded-md border border-surface-200 dark:border-surface-700 p-4"
            >
              <p class="font-semibold text-sm mb-3">{{ RAC_RANGES[range].label }}</p>
              <div class="grid grid-cols-1 gap-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-surface-500">Carga fábrica</span>
                  <span>{{ RAC_RANGES[range].factoryLengthM }} m</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-surface-500">Total a cargar</span>
                  <span>{{ res.toChargeM.toFixed(1) }} m</span>
                </div>
                <div class="flex justify-between items-center pt-2 border-t border-surface-200 dark:border-surface-700">
                  <span class="font-semibold">Carga adicional total</span>
                  <span
                    class="text-lg font-bold"
                    :class="res.totalGrams > 0 ? 'text-primary-600 dark:text-primary-400' : 'text-surface-400'"
                  >
                    {{ res.totalGrams > 0 ? res.totalGrams.toFixed(0) + ' g' : 'Sin carga adicional' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-surface-400 mt-3 text-sm">
            Introduce la longitud de tubería para ver el resultado.
          </p>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>
