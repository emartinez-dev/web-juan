<script setup>
import { ref } from 'vue'

import Button from 'primevue/button'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'
import ProgressSpinner from 'primevue/progressspinner'

const fahrenheit = 273.15

const presion_inicial = ref(undefined)
const temperatura_inicial = ref(undefined)
const temperatura_final = ref(undefined)

const presion_final = ref(undefined)
const diferencia_temperatura = ref(undefined)
const diferencia_presion = ref(undefined)

const loading = ref(false)

function resetResultados() {
  presion_final.value = undefined
  diferencia_temperatura.value = undefined
  diferencia_presion.value = undefined
}

async function calcularPresionFinal(presionInicial, temperaturaInicial, temperaturaFinal) {
  resetResultados()
  loading.value = true
  await new Promise(r => setTimeout(r, 1000));

  presion_final.value = (presionInicial * (temperaturaFinal + fahrenheit))
                        / (temperaturaInicial + fahrenheit)
  diferencia_temperatura.value = temperatura_final.value - temperatura_inicial.value
  diferencia_presion.value = presion_final.value - presionInicial

  loading.value = false
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <Card
        class="min-h-full flex flex-col"
        :pt="{ body: { class: 'min-h-full' }, content: { class: 'flex-1' } }"
      >
        <template #title>Datos iniciales - Nitrógeno seco N2</template>
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
            <Button
              label="Calcular"
              @click="calcularPresionFinal(presion_inicial, temperatura_inicial, temperatura_final)"
            />
          </div>
        </template>
      </Card>
      <Card
        class="min-h-full flex flex-col"
        :pt="{ body: { class: 'min-h-full' }, content: { class: 'flex-1' } }"
      >
        <template #title>Resultado</template>
        <template #content>
          <ProgressSpinner v-if="loading" class="w-full m-auto min-h-full" />
          <div v-if="!isNaN(presion_final)" class="min-h-full flex flex-col justify-around">
            <div>
              Presión final: <b>{{ presion_final.toFixed(2) }} Bar.</b>
            </div>
            <div>
              Diferencia de temperatura: <b>{{ diferencia_temperatura.toFixed(2) }} ºC.</b>
            </div>
            <div>
              Diferencia de presión: <b>{{ diferencia_presion.toFixed(2) }} Bar.</b>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style></style>

