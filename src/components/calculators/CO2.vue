<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'

const kg_refrigerante = ref(undefined)
const tipo_refrigerante = ref(undefined)

const refrigerantes = [
  { name: 'R-22', value: 1.81 },
  { name: 'R-23', value: 14.8 },
  { name: 'R-32', value: 0.675 },
  { name: 'R-125', value: 3.5 },
  { name: 'R-134a', value: 1.43 },
  { name: 'R-245FA', value: 1.03 },
  { name: 'R-404A', value: 3.922 },
  { name: 'R-407A', value: 2.017 },
  { name: 'R-407C', value: 1.774 },
  { name: 'R-407D', value: 1.627 },
  { name: 'R-407F', value: 1.825 },
  { name: 'R-410A', value: 2.088 },
  { name: 'R-413A', value: 2.053 },
  { name: 'R-417A', value: 2.346 },
  { name: 'R-422A', value: 3.143 },
  { name: 'R-422D', value: 2.729 },
  { name: 'R-423A', value: 2.28 },
  { name: 'R-424A', value: 2.44 },
  { name: 'R-426A', value: 1.508 },
  { name: 'R-427A', value: 2.138 },
  { name: 'R-428A', value: 3.607 },
  { name: 'R-434A', value: 3.245 },
  { name: 'R-437A', value: 1.805 },
  { name: 'R-438A', value: 2.265 },
  { name: 'R-442A', value: 1.888 },
  { name: 'R-448A', value: 1.387 },
  { name: 'R-449A', value: 1.397 },
  { name: 'R-452A', value: 2.14 },
  { name: 'R-507', value: 3.985 },
  { name: 'R-508A', value: 13.214 },
  { name: 'R-290 (Propano)', value: 0.003 },
  { name: 'R-600a (Butano)', value: 0.004 },
  { name: 'R-717 (Amoniaco)', value: 0.0 },
  { name: 'R-744 (CO2)', value: 0.0 },
]

const result = computed(() => {
  if (kg_refrigerante.value == null || tipo_refrigerante.value == null) return null
  return {
    nombre: tipo_refrigerante.value.name,
    toneladas: kg_refrigerante.value * tipo_refrigerante.value.value,
  }
})
</script>

<template>
  <CalculatorLayout
    title="Equivalencias Refrigerantes y CO₂"
    subtitle="Calcula el impacto en toneladas de CO₂ equivalente"
  >
    <template #inputs>
      <Card class="min-h-full flex flex-col">
        <template #title>Datos iniciales - Kilos y tipo de refrigerante</template>
        <template #content>
          <div class="grid grid-cols-1 gap-3 mt-3">
            <InputGroup>
              <FloatLabel variant="on">
                <InputNumber id="kg_refrigerante" v-model="kg_refrigerante" fluid />
                <label for="kg_refrigerante">Peso del refrigerante</label>
              </FloatLabel>
              <InputGroupAddon class="min-w-20">kg</InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <FloatLabel variant="on">
                <Select
                  id="tipo_refrigerante"
                  v-model="tipo_refrigerante"
                  filter
                  :options="refrigerantes"
                  optionLabel="name"
                  class="w-full md:w-56"
                />
                <label for="tipo_refrigerante">Refrigerante</label>
              </FloatLabel>
            </InputGroup>
          </div>
        </template>
      </Card>
    </template>
    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultado</template>
        <template #content>
          <div class="flex flex-col justify-center items-center h-full gap-4 text-center">
            <template v-if="result">
              <p>{{ kg_refrigerante }} kg del refrigerante {{ result.nombre }} equivalen a</p>
              <p class="text-2xl"><b>{{ result.toneladas.toFixed(3) }}</b> toneladas de CO₂</p>
            </template>
            <p v-else class="text-surface-400 text-sm">Selecciona un refrigerante e introduce el peso para ver el resultado.</p>
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
