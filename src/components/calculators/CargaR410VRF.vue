<script setup>
import { ref, computed } from 'vue'

import CalculatorLayout from '@/components/CalculatorLayout.vue'
import Card from 'primevue/card'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'

import {
  PIPE_LINES,
  V8_HP_CHARGE, V6R_MS_BOXES, V6R_OUTDOOR_UNITS,
  calcV6, calcV8, calcV6R,
} from '@/logic/cargaR410VRF.js'

const systemTypes = [
  { label: 'V6', value: 'V6' },
  { label: 'V8', value: 'V8' },
  { label: 'V6R', value: 'V6R' },
]
const systemType = ref('V6')

// Tubería (común)
const metersMap = ref(Object.fromEntries(PIPE_LINES.map((l) => [l.key, undefined])))

// V8 HP
const hpOptions = V8_HP_CHARGE.map((e) => ({ label: `${e.hp} HP`, value: e.hp }))
const selectedHp = ref(null)

// V6R MS box counts
const msBoxCounts = ref(Object.fromEntries(V6R_MS_BOXES.map((b) => [b.model, undefined])))

// V6R outdoor unit
const outdoorOptions = V6R_OUTDOOR_UNITS.map((u) => ({ label: u.model, value: u.model }))
const selectedOutdoor = ref(null)

function hasPipeInput() {
  return Object.values(metersMap.value).some((v) => v !== undefined && v !== null)
}

const result = computed(() => {
  const type = systemType.value
  const meters = Object.fromEntries(
    PIPE_LINES.map((l) => [l.key, metersMap.value[l.key] ?? 0])
  )

  if (type === 'V6') {
    if (!hasPipeInput()) return null
    return { type, ...calcV6(meters) }
  }

  if (type === 'V8') {
    if (!hasPipeInput() && selectedHp.value == null) return null
    return { type, ...calcV8(meters, selectedHp.value) }
  }

  // V6R
  const msMap = Object.fromEntries(
    V6R_MS_BOXES.map((b) => [b.model, msBoxCounts.value[b.model] ?? 0])
  )
  const hasAnyInput = hasPipeInput() || selectedOutdoor.value || Object.values(msBoxCounts.value).some((v) => v)
  if (!hasAnyInput) return null
  return { type, ...calcV6R(meters, msMap, selectedOutdoor.value) }
})
</script>

<template>
  <CalculatorLayout
    title="Carga Refrigerante VRF R-410A"
    subtitle="Carga adicional por metros de línea de líquido — Unidades Midea VRF"
  >
    <template #inputs>
      <div class="flex flex-col gap-4">
        <Card>
          <template #title>Tipo de sistema</template>
          <template #content>
            <SelectButton
              v-model="systemType"
              :options="systemTypes"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            />
          </template>
        </Card>

        <Card>
          <template #title>Metros por diámetro de tubería</template>
          <template #content>
            <p class="text-surface-500 text-sm mt-2 mb-4">
              Introduce los metros totales de cada diámetro de línea de líquido instalado.
            </p>
            <div class="grid grid-cols-1 gap-3">
              <InputGroup v-for="line in PIPE_LINES" :key="line.key">
                <InputGroupAddon class="min-w-24 justify-start font-mono text-sm">
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

        <Card v-if="systemType === 'V8'">
          <template #title>Potencia del sistema</template>
          <template #content>
            <p class="text-surface-500 text-sm mt-2 mb-4">
              Selecciona los HP de la unidad exterior.
            </p>
            <Select
              v-model="selectedHp"
              :options="hpOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecciona HP"
              class="w-full"
            />
          </template>
        </Card>

        <Card v-if="systemType === 'V6R'">
          <template #title>Cajas MS</template>
          <template #content>
            <p class="text-surface-500 text-sm mt-2 mb-4">
              Indica el número de cajas de cada modelo instalado.
            </p>
            <div class="grid grid-cols-1 gap-3">
              <InputGroup v-for="box in V6R_MS_BOXES" :key="box.model">
                <InputGroupAddon class="min-w-32 justify-start text-sm">
                  {{ box.model }}
                </InputGroupAddon>
                <InputNumber
                  v-model="msBoxCounts[box.model]"
                  :min="0"
                  :max-fraction-digits="0"
                  :placeholder="`× ${box.kg} kg`"
                  fluid
                />
                <InputGroupAddon class="min-w-10">uds</InputGroupAddon>
              </InputGroup>
            </div>
          </template>
        </Card>

        <Card v-if="systemType === 'V6R'">
          <template #title>Unidad exterior</template>
          <template #content>
            <p class="text-surface-500 text-sm mt-2 mb-4">
              Selecciona el modelo de unidad exterior.
            </p>
            <Select
              v-model="selectedOutdoor"
              :options="outdoorOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Selecciona modelo"
              class="w-full"
            />
          </template>
        </Card>
      </div>
    </template>

    <template #results>
      <Card class="min-h-full flex flex-col">
        <template #title>Resultado</template>
        <template #content>
          <div v-if="result" class="mt-3 flex flex-col gap-6">
            <!-- Tabla de tubería (siempre) -->
            <div>
              <h4 class="text-sm font-semibold text-surface-500 mb-2 uppercase tracking-wide">Tubería</h4>
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
                    v-for="line in result.pipes.lines"
                    :key="line.key"
                    class="border-b border-surface-100 dark:border-surface-800"
                  >
                    <td class="py-1.5 font-mono">{{ line.label }}</td>
                    <td class="py-1.5 text-right">{{ line.meters.toFixed(1) }}</td>
                    <td class="py-1.5 text-right">{{ line.kg.toFixed(3) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="border-t border-surface-200 dark:border-surface-700">
                    <td colspan="2" class="pt-2 font-semibold text-surface-600 dark:text-surface-300">Subtotal tubería</td>
                    <td class="pt-2 text-right font-semibold">{{ result.pipes.totalKg.toFixed(3) }} kg</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- V8: carga por HP -->
            <div v-if="result.type === 'V8'">
              <h4 class="text-sm font-semibold text-surface-500 mb-2 uppercase tracking-wide">Carga por HP</h4>
              <div class="flex justify-between items-center py-2 border-b border-surface-100 dark:border-surface-800 text-sm">
                <span>{{ selectedHp != null ? selectedHp + ' HP' : 'No seleccionado' }}</span>
                <span class="font-semibold">{{ result.hpKg.toFixed(1) }} kg</span>
              </div>
            </div>

            <!-- V6R: cajas MS -->
            <div v-if="result.type === 'V6R'">
              <h4 class="text-sm font-semibold text-surface-500 mb-2 uppercase tracking-wide">Cajas MS</h4>
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-surface-200 dark:border-surface-700">
                    <th class="text-left pb-2 text-surface-500 font-normal">Modelo</th>
                    <th class="text-right pb-2 text-surface-500 font-normal">Cantidad</th>
                    <th class="text-right pb-2 text-surface-500 font-normal">Carga (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="ms in result.msLines"
                    :key="ms.model"
                    class="border-b border-surface-100 dark:border-surface-800"
                  >
                    <td class="py-1.5">{{ ms.model }}</td>
                    <td class="py-1.5 text-right">{{ ms.count }}</td>
                    <td class="py-1.5 text-right">{{ ms.kg.toFixed(3) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="border-t border-surface-200 dark:border-surface-700">
                    <td colspan="2" class="pt-2 font-semibold text-surface-600 dark:text-surface-300">Subtotal cajas MS</td>
                    <td class="pt-2 text-right font-semibold">{{ result.msKg.toFixed(3) }} kg</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- V6R: unidad exterior -->
            <div v-if="result.type === 'V6R'">
              <h4 class="text-sm font-semibold text-surface-500 mb-2 uppercase tracking-wide">Unidad exterior</h4>
              <div class="flex justify-between items-center py-2 border-b border-surface-100 dark:border-surface-800 text-sm">
                <span>{{ result.outdoorModel ?? 'No seleccionado' }}</span>
                <span class="font-semibold">{{ result.outdoorKg.toFixed(1) }} kg</span>
              </div>
            </div>

            <!-- TOTAL -->
            <div class="flex justify-between items-center pt-2 border-t-2 border-primary-400 dark:border-primary-600">
              <span class="text-lg font-bold">TOTAL</span>
              <span class="text-xl font-bold text-primary-600 dark:text-primary-400">
                {{ result.totalKg.toFixed(3) }} kg
              </span>
            </div>
          </div>

          <p v-else class="text-surface-400 mt-3 text-sm">
            Introduce los metros de alguna línea para ver el resultado.
          </p>
        </template>
      </Card>
    </template>
  </CalculatorLayout>
</template>
