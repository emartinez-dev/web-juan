import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import CalculatorsView from '@/views/CalculatorsView.vue'
import GayLussac from '@/components/calculators/GayLussac.vue'
import CO2 from '@/components/calculators/CO2.vue'
import CargaR32Rac from '@/components/calculators/CargaR32Rac.vue'
import CargaR410VRF from '@/components/calculators/CargaR410VRF.vue'
import CargaR32VRF from '@/components/calculators/CargaR32VRF.vue'
import CaudalAgua from '@/components/calculators/CaudalAgua.vue'

import './assets/tailwind.css'
import './style.css'

const routes = [
  { path: '/', component: CalculatorsView },
  { path: '/gay-lussac', component: GayLussac },
  { path: '/co2', component: CO2 },
  { path: '/carga-r32-rac', component: CargaR32Rac },
  { path: '/carga-r410-vrf', component: CargaR410VRF },
  { path: '/carga-r32-vrf', component: CargaR32VRF },
  { path: '/caudal-agua', component: CaudalAgua },
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
