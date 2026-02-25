<script setup>
import CalculatorCard from '@/components/CalculatorCard.vue'

const calculators = [
  {
    title: 'Calculadora Ley Gay-Lussac',
    subtitle: 'Relación entre presión y temperatura',
    description: `Esta calculadora se utiliza para resolver problemas relacionados con
                  la ley de Gay-Lussac, que describe la relación entre la presión y la temperatura
                  de un gas ideal, manteniendo constante el volumen y la cantidad de gas`,
    imageUrl: '',
    url: 'gay-lussac'
  },
  {
    title: 'Equivalencias Refrigerantes y CO₂',
    subtitle: 'Relación gases refrigerantes - CO₂',
    description: `Una calculadora de equivalencia de masa entre gases refrigerantes y CO₂ sirve
                  para comparar el impacto ambiental de diferentes gases refrigerantes en toneladas
                  de CO₂`,
    imageUrl: '',
    url: 'co2'
  },
  {
    title: 'Carga Adicional R-32 — RAC / LCAC',
    subtitle: 'Carga de gas por longitud de tubería',
    description: `Calcula la carga adicional de refrigerante R-32 necesaria según la longitud
                  total de la tubería de líquido instalada, para equipos de las gamas
                  7,1–16 kW y 2,6–5,2 kW.`,
    imageUrl: '',
    url: 'carga-r32-rac'
  },
  {
    title: 'Carga Refrigerante VRF R-410A',
    subtitle: 'Carga adicional por línea de líquido',
    description: `Calcula la carga adicional de R-410A para sistemas VRF Midea según los
                  metros de tubería de líquido de cada diámetro instalado.`,
    imageUrl: '',
    url: 'carga-r410-vrf'
  },
  {
    title: 'Carga Adicional VRF R-32',
    subtitle: 'Tuberías + potencia interior instalada',
    description: `Calcula la carga adicional de R-32 para sistemas VRF combinando los metros
                  de tubería de líquido por diámetro y la potencia total de las unidades
                  interiores instaladas.`,
    imageUrl: '',
    url: 'carga-r32-vrf'
  },
  {
    title: 'Cálculo de Caudal de Agua',
    subtitle: 'Capacidad de tubería vs demanda del equipo',
    description: `Calcula el caudal máximo que admite una tubería según su diámetro y
                  velocidad del agua, y lo compara con el caudal nominal requerido por
                  el equipo. Indica si la tubería es suficiente.`,
    imageUrl: '',
    url: 'caudal-agua'
  }
]
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-surface-800 dark:text-surface-50">Calculadoras</h1>
      <p class="text-surface-500 mt-2">
        Herramientas de cálculo para técnicos de climatización y refrigeración
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CalculatorCard
        v-for="calc in calculators"
        :key="calc.title"
        :title="calc.title"
        :subtitle="calc.subtitle"
        :description="calc.description"
        :image-url="calc.imageUrl"
        :url="calc.url"
      />
    </div>
  </div>
</template>
