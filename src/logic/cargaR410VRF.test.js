import { describe, it, expect } from 'vitest'
import {
  PIPE_LINES,
  V8_HP_CHARGE, V6R_MS_BOXES, V6R_OUTDOOR_UNITS,
  calcV6, calcV8, calcV6R,
} from './cargaR410VRF.js'

// --- Tubería (común a los 3 sistemas) ---

describe('PIPE_LINES — factores kg/m', () => {
  it('verifica los 8 factores exactos del Excel', () => {
    const expected = [0.68, 0.52, 0.36, 0.26, 0.17, 0.11, 0.057, 0.022]
    PIPE_LINES.forEach((line, i) => {
      expect(line.kgPerM).toBe(expected[i])
    })
  })
})

describe('calcV6 — cálculos', () => {
  it('todos a 0 metros → 0 kg total', () => {
    expect(calcV6({}).totalKg).toBe(0)
  })

  it('10 m de 1 1/8" → 6.8 kg', () => {
    const { pipes, totalKg } = calcV6({ l1_1_8: 10 })
    expect(pipes.lines[0].kg).toBeCloseTo(6.8, 6)
    expect(totalKg).toBeCloseTo(6.8, 6)
  })

  it('caso mixto: 10 m 1 1/8" + 5 m 1" = 9.4 kg', () => {
    expect(calcV6({ l1_1_8: 10, l1: 5 }).totalKg).toBeCloseTo(9.4, 6)
  })

  it('todas las líneas con 1 metro → suma de factores', () => {
    const allOne = Object.fromEntries(PIPE_LINES.map((l) => [l.key, 1]))
    const expectedTotal = PIPE_LINES.reduce((s, l) => s + l.kgPerM, 0)
    expect(calcV6(allOne).totalKg).toBeCloseTo(expectedTotal, 10)
  })
})

// --- V8 ---

describe('calcV8 — carga por HP', () => {
  it('HP ≤ 24 → 0 kg adicionales', () => {
    for (const hp of [8, 10, 12, 14, 16, 18, 20, 22, 24]) {
      expect(calcV8({}, hp).hpKg).toBe(0)
    }
  })

  it('26 HP → 7 kg adicionales', () => {
    expect(calcV8({}, 26).hpKg).toBe(7)
  })

  it('28, 30 y 32 HP → 9 kg adicionales', () => {
    for (const hp of [28, 30, 32]) {
      expect(calcV8({}, hp).hpKg).toBe(9)
    }
  })

  it('tubería + HP se suman: 10 m 1 1/8" + 26 HP = 6.8 + 7 = 13.8 kg', () => {
    const { pipes, hpKg, totalKg } = calcV8({ l1_1_8: 10 }, 26)
    expect(pipes.totalKg).toBeCloseTo(6.8, 6)
    expect(hpKg).toBe(7)
    expect(totalKg).toBeCloseTo(13.8, 6)
  })
})

// --- V6R ---

describe('calcV6R — cajas MS', () => {
  it('verifica los 4 modelos y sus cargas', () => {
    expect(V6R_MS_BOXES).toEqual([
      { model: 'MS01/N1-D', kg: 0.1 },
      { model: 'MS04/N1-D', kg: 0.5 },
      { model: 'MS06/N1-D', kg: 0.5 },
      { model: 'MS10/N1-D', kg: 1.0 },
    ])
  })

  it('2 cajas MS10/N1-D = 2.0 kg', () => {
    const { msKg } = calcV6R({}, { 'MS10/N1-D': 2 }, '8 CV')
    expect(msKg).toBeCloseTo(2.0, 6)
  })
})

describe('calcV6R — unidades exteriores', () => {
  it('verifica los 6 modelos y sus cargas', () => {
    expect(V6R_OUTDOOR_UNITS).toEqual([
      { model: '8 CV',  kg: 2.0 },
      { model: '10 CV', kg: 2.0 },
      { model: '12 CV', kg: 2.6 },
      { model: '14 CV', kg: 4.9 },
      { model: '16 CV', kg: 5.5 },
      { model: '18 CV', kg: 5.7 },
    ])
  })
})

describe('calcV6R — cálculo completo', () => {
  it('solo tubería: 10 m 1 1/8" → 6.8 + outdoor 2.0 = 8.8 kg', () => {
    const { totalKg } = calcV6R({ l1_1_8: 10 }, {}, '8 CV')
    expect(totalKg).toBeCloseTo(8.8, 6)
  })

  it('todo combinado: tubería + 1 caja MS10 + 14 CV', () => {
    const { pipes, msKg, outdoorKg, totalKg } = calcV6R(
      { l3_4: 5 },            // 5 × 0.26 = 1.3 kg
      { 'MS10/N1-D': 1 },     // 1.0 kg
      '14 CV'                  // 4.9 kg
    )
    expect(pipes.totalKg).toBeCloseTo(1.3, 6)
    expect(msKg).toBeCloseTo(1.0, 6)
    expect(outdoorKg).toBeCloseTo(4.9, 6)
    expect(totalKg).toBeCloseTo(7.2, 6)
  })
})
