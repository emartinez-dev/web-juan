<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'

import { calcVRF410Charge, VRF_R410_LINES } from '@/logic/cargaR410VRF.js'

const metersMap = ref(Object.fromEntries(VRF_R410_LINES.map((l) => [l.key, undefined])))

const result = computed(() => {
  const filled = Object.fromEntries(
    Object.entries(metersMap.value).filter(([, v]) => v !== undefined && v !== null)
  )
  if (!Object.keys(filled).length) return null
  return calcVRF410Charge(
    Object.fromEntries(VRF_R410_LINES.map((l) => [l.key, metersMap.value[l.key] ?? 0]))
  )
})
</script>

<template>
  <CalculatorLayout
    title="Carga Refrigerante VRF R-410A"
    subtitle="Carga adicional por metros de línea de líquido — Unidades Midea VRF"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Metros por diámetro de tubería</template>
        <template #content>
          <p class="text-surface-500 text-sm mt-2 mb-4">
            Introduce los metros totales de cada diámetro de línea de líquido instalado.
          </p>
          <div class="grid grid-cols-1 gap-3">
            <InputGroup v-for="line in VRF_R410_LINES" :key="line.key">
              <InputGroupAddon class="min-w-20 justify-start font-mono text-sm">
                {{ line.label }}
              </InputGroupAddon>
              <InputNumber
                v-model="metersMap[line.key]"
                :min="0"
                :min-fraction-digits="0"
                :max-fraction-digits="1"
                :placeholder="`0 m × ${line.kgPerM} kg/m`"
                fluid
              />
              <InputGroupAddon class="min-w-10">m</InputGroupAddon>
            </InputGroup>
          </div>
        </template>
      </Card>
    </template>

    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultado</template>
        <template #content>
          <div v-if="result" class="mt-3">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-surface-200 dark:border-surface-700">
                  <th class="text-left pb-2 text-surface-500 font-normal">Diámetro</th>
                  <th class="text-right pb-2 text-surface-500 font-normal">Metros</th>
                  <th class="text-right pb-2 text-surface-500 font-normal">Carga (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="line in result.lines"
                  :key="line.key"
                  class="border-b border-surface-100 dark:border-surface-800"
                >
                  <td class="py-1.5 font-mono">{{ line.label }}</td>
                  <td class="py-1.5 text-right">{{ line.meters.toFixed(1) }}</td>
                  <td class="py-1.5 text-right">{{ line.kg.toFixed(3) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" class="pt-3 font-bold">TOTAL</td>
                  <td class="pt-3 text-right text-lg font-bold text-primary-600 dark:text-primary-400">
                    {{ result.totalKg.toFixed(3) }} kg
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p v-else class="text-surface-400 mt-3 text-sm">
            Introduce los metros de alguna línea para ver el resultado.
          </p>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>
