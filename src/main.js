import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import CalculatorsView from '@/views/CalculatorsView.vue'
import GayLussac from '@/components/calculators/GayLussac.vue'
import CO2 from '@/components/calculators/CO2.vue'
import ConversionTemperatura from '@/components/calculators/ConversionTemperatura.vue'
import ConversionPresion from '@/components/calculators/ConversionPresion.vue'
import SuperheatSubcooling from '@/components/calculators/SuperheatSubcooling.vue'
import ToneladasRefrigeracion from '@/components/calculators/ToneladasRefrigeracion.vue'

import './assets/tailwind.css'
import './style.css'

const routes = [
  { path: '/', component: CalculatorsView },
  { path: '/gay-lussac', component: GayLussac },
  { path: '/co2', component: CO2 },
  { path: '/conversion-temperatura', component: ConversionTemperatura },
  { path: '/conversion-presion', component: ConversionPresion },
  { path: '/superheat-subcooling', component: SuperheatSubcooling },
  { path: '/toneladas-refrigeracion', component: ToneladasRefrigeracion }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(PrimeVue, {
  theme: 'none'
})
app.use(router)
app.mount('#app')
