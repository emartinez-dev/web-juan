<script setup>
import CalculatorCard from '@/components/CalculatorCard.vue'

const categories = [
  {
    label: 'Gas Refrigerante',
    icon: 'pi pi-cloud',
    calculators: [
      {
        title: 'Ley Gay-Lussac',
        description: 'Presión final de N₂ a partir de temperaturas inicial y final',
        icon: 'pi pi-gauge',
        url: 'gay-lussac',
      },
      {
        title: 'Equivalencias Refrigerantes CO₂',
        description: 'Impacto en toneladas de CO₂ equivalente por tipo de gas',
        icon: 'pi pi-cloud',
        url: 'co2',
      },
      {
        title: 'Carga Adicional R-32 — RAC / LCAC',
        description: 'Gramos de R-32 adicionales según longitud de tubería instalada',
        icon: 'pi pi-bolt',
        url: 'carga-r32-rac',
      },
      {
        title: 'Carga Refrigerante VRF R-410A',
        description: 'Carga adicional de R-410A por diámetro y longitud de tubería',
        icon: 'pi pi-database',
        url: 'carga-r410-vrf',
      },
      {
        title: 'Carga Adicional VRF R-32',
        description: 'R-32 adicional combinando tuberías y potencia de unidades interiores',
        icon: 'pi pi-sitemap',
        url: 'carga-r32-vrf',
      },
    ],
  },
  {
    label: 'Hidráulica',
    icon: 'pi pi-chart-bar',
    calculators: [
      {
        title: 'Cálculo de Caudal de Agua',
        description: 'Comprueba si la tubería admite el caudal requerido por el equipo',
        icon: 'pi pi-chart-bar',
        url: 'caudal-agua',
      },
    ],
  },
]
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-surface-800 dark:text-surface-50">Calculadoras</h1>
      <p class="text-surface-500 dark:text-surface-400 mt-2 text-sm">
        Herramientas de cálculo para técnicos de climatización y refrigeración
      </p>
    </div>

    <div class="flex flex-col gap-10">
      <section v-for="cat in categories" :key="cat.label">
        <div class="flex items-center gap-2 mb-4">
          <i :class="cat.icon" class="text-primary-600 dark:text-primary-400" />
          <h2 class="text-sm font-semibold uppercase tracking-widest text-surface-500 dark:text-surface-400">
            {{ cat.label }}
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <CalculatorCard
            v-for="calc in cat.calculators"
            :key="calc.url"
            :title="calc.title"
            :description="calc.description"
            :icon="calc.icon"
            :url="calc.url"
          />
        </div>
      </section>
    </div>
  </div>
</template>
