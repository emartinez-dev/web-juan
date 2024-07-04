<script setup>
import { ref, computed } from "vue"

import InputNumber from "primevue/inputnumber"

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
    <div>
      <label for="presion_inicial">Presión Inicial</label>
      <InputNumber id="presion_inicial" v-model="presion_inicial" suffix=" Bar." fluid></InputNumber>

      <label for="temperatura_inicial">Temperatura Inicial</label>
      <InputNumber id="temperatura_inicial" v-model="temperatura_inicial" suffix=" ºC" fluid></InputNumber>

      <label for="temperatura_final">Temperatura Final</label>
      <InputNumber id="temperatura_final" v-model="temperatura_final" suffix=" ºC" fluid></InputNumber>

      <label for="presion_final">Presion Final</label>
      <InputNumber id="presion_final" :model-value="presion_final" :readonly="true" suffix=" Bar." fluid></InputNumber>
    </div>
    <div>
      <label for="diferencia_temperatura">Diferencia Temperatura</label>
      <InputNumber id="diferencia_temperatura" :model-value="diferencia_temperatura" :readonly="true" suffix=" ºC"
        fluid></InputNumber>

      <label for="diferencia_presion">Diferencia Presión</label>
      <InputNumber id="diferencia_presion" :model-value="diferencia_presion" :readonly="true" suffix=" Bar." fluid>
      </InputNumber>
    </div>
  </div>
</template>

<style scoped>
.datos-calculo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  padding: 2rem;
}

.datos-calculo label {
  font-weight: bold;
}
</style>
