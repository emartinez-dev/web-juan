<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'

const KELVIN_OFFSET = 273.15

const presion_inicial = ref(undefined)
const temperatura_inicial = ref(undefined)
const temperatura_final = ref(undefined)

const result = computed(() => {
  if (
    presion_inicial.value == null ||
    temperatura_inicial.value == null ||
    temperatura_final.value == null
  )
    return null

  const presion_final =
    (presion_inicial.value * (temperatura_final.value + KELVIN_OFFSET)) /
    (temperatura_inicial.value + KELVIN_OFFSET)

  return {
    presion_final,
    diferencia_temperatura: temperatura_final.value - temperatura_inicial.value,
    diferencia_presion: presion_final - presion_inicial.value,
  }
})
</script>

<template>
  <CalculatorLayout
    title="Ley Gay-Lussac"
    subtitle="Relación entre presión y temperatura de un gas ideal (volumen constante)"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Datos iniciales - Nitrógeno seco N₂</template>
        <template #content>
          <div class="grid grid-cols-1 gap-3 mt-3">
            <InputGroup>
              <FloatLabel variant="on">
                <InputNumber id="presion_inicial" v-model="presion_inicial" fluid />
                <label for="presion_inicial">Presión inicial</label>
              </FloatLabel>
              <InputGroupAddon class="min-w-20">Bar</InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <FloatLabel variant="on">
                <InputNumber id="temperatura_inicial" v-model="temperatura_inicial" fluid />
                <label for="temperatura_inicial">Temperatura inicial</label>
              </FloatLabel>
              <InputGroupAddon class="min-w-20">ºC</InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <FloatLabel variant="on">
                <InputNumber id="temperatura_final" v-model="temperatura_final" fluid />
                <label for="temperatura_final">Temperatura final</label>
              </FloatLabel>
              <InputGroupAddon class="min-w-20">ºC</InputGroupAddon>
            </InputGroup>
          </div>
        </template>
      </Card>
    </template>
    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultado</template>
        <template #content>
          <div class="flex flex-col justify-center h-full gap-3">
            <template v-if="result">
              <div>Presión final: <b>{{ result.presion_final.toFixed(2) }} Bar</b></div>
              <div>Diferencia de temperatura: <b>{{ result.diferencia_temperatura.toFixed(2) }} ºC</b></div>
              <div>Diferencia de presión: <b>{{ result.diferencia_presion.toFixed(2) }} Bar</b></div>
            </template>
            <p v-else class="text-surface-400 text-sm">Introduce los tres valores para ver el resultado.</p>
          </div>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>

<style scoped>
@reference "../../assets/tailwind.css";
:deep(.p-card-body) {
  @apply flex flex-col h-full;
}
:deep(.p-card-content) {
  @apply flex-1;
}
</style>
