import { describe, it, expect } from 'vitest'
import { calcVRF410Charge, VRF_R410_LINES } from './cargaR410VRF.js'

/**
 * Valores de referencia extraídos del Excel VRF_R-410_V6.xlsx:
 *
 * Factores kg/m (columna F):
 *   1 1/8" → 0.68    1"   → 0.52    7/8" → 0.36    3/4" → 0.26
 *   5/8"   → 0.17    1/2" → 0.11    3/8" → 0.057   1/4" → 0.022
 *
 * Fórmula:  H_n = D_n × F_n
 * Total:    H19 = SUM(H10:H17)
 *
 * Con todos los metros en 0 (valores por defecto del Excel) → TOTAL = 0 kg
 */

describe('calcVRF410Charge — factores kg/m', () => {
  it('verifica los 8 factores exactos del Excel', () => {
    const expected = [0.68, 0.52, 0.36, 0.26, 0.17, 0.11, 0.057, 0.022]
    VRF_R410_LINES.forEach((line, i) => {
      expect(line.kgPerM).toBe(expected[i])
    })
  })
})

describe('calcVRF410Charge — cálculos', () => {
  it('todos a 0 metros → 0 kg total', () => {
    const { totalKg } = calcVRF410Charge({})
    expect(totalKg).toBe(0)
  })

  it('10 m de línea 1 1/8" → 6.8 kg', () => {
    const { lines, totalKg } = calcVRF410Charge({ l1_1_8: 10 })
    expect(lines[0].kg).toBeCloseTo(6.8, 6)
    expect(totalKg).toBeCloseTo(6.8, 6)
  })

  it('10 m de línea 1" → 5.2 kg', () => {
    const { totalKg } = calcVRF410Charge({ l1: 10 })
    expect(totalKg).toBeCloseTo(5.2, 6)
  })

  it('10 m de línea 3/8" → 0.57 kg', () => {
    const { totalKg } = calcVRF410Charge({ l3_8: 10 })
    expect(totalKg).toBeCloseTo(0.57, 6)
  })

  it('10 m de línea 1/4" → 0.22 kg', () => {
    const { totalKg } = calcVRF410Charge({ l1_4: 10 })
    expect(totalKg).toBeCloseTo(0.22, 6)
  })

  it('replica un caso mixto: 10 m 1 1/8" + 5 m 1" = 6.8 + 2.6 = 9.4 kg', () => {
    const { totalKg } = calcVRF410Charge({ l1_1_8: 10, l1: 5 })
    expect(totalKg).toBeCloseTo(9.4, 6)
  })

  it('todas las líneas con 1 metro → suma de todos los factores', () => {
    const allOne = Object.fromEntries(VRF_R410_LINES.map((l) => [l.key, 1]))
    const { totalKg } = calcVRF410Charge(allOne)
    const expectedTotal = VRF_R410_LINES.reduce((s, l) => s + l.kgPerM, 0)
    expect(totalKg).toBeCloseTo(expectedTotal, 10)
  })
})
