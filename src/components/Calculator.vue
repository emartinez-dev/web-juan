<script setup>
import { ref, computed } from "vue"

import InputNumber from "primevue/inputnumber"
import Card from 'primevue/card'

const fahrenheit = 273.15

const presion_inicial = ref(0)
const temperatura_inicial = ref(0)
const temperatura_final = ref(0)

const presion_final = computed(() =>
  presion_inicial.value * (temperatura_final.value + fahrenheit) / (temperatura_inicial.value + fahrenheit)
)

const diferencia_temperatura = computed(() =>
  temperatura_inicial.value - temperatura_final.value
)

const diferencia_presion = computed(() =>
  presion_inicial.value - presion_final.value
)
</script>

<template>
  <div class="datos-calculo">
    <div class="tarjetas">
      <Card class="card" :pt="{ root: { id: 'calc-card' } }">
        <template #title>Datos iniciales</template>
        <template #content>
          <label for="presion_inicial">Presión Inicial</label>
          <InputNumber id="presion_inicial" v-model="presion_inicial" suffix=" Bar." fluid></InputNumber>
          <label for="temperatura_inicial">Temperatura Inicial</label>
          <InputNumber id="temperatura_inicial" v-model="temperatura_inicial" suffix=" ºC" fluid></InputNumber>
          <label for="temperatura_final">Temperatura Final</label>
          <InputNumber id="temperatura_final" v-model="temperatura_final" suffix=" ºC" fluid></InputNumber>
        </template>
      </Card>
      <Card class="card" :pt="{ root: { id: 'result-card' } }">
        <template #title>Resultado</template>
        <template #content>
          <h3>Presión final: <b>{{ presion_final.toFixed(2) }} Bar.</b></h3>
          <h3>Diferencia de temperatura: <b>{{ diferencia_temperatura.toFixed(2) }} ºC.</b></h3>
          <h3>Diferencia de presión: <b>{{ diferencia_presion.toFixed(2) }} Bar.</b></h3>
        </template>
      </Card>
    </div>
  </div>
</template>

<style>
.datos-calculo {
  display: flex;
  flex-direction: row;
  padding: 2rem;
}

.datos-calculo label {
  font-size: 1.1em;
}

#calc-card {
  margin-bottom: 1rem;
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.p-card-body {
  color: #000;
}

#result-card {
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
