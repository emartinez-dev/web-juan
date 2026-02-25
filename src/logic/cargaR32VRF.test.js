import { describe, it, expect } from 'vitest'
import { calcVRF32Charge, VRF_R32_PIPES, POWER_CHARGE_G_PER_W } from './cargaR32VRF.js'

/**
 * Valores de referencia extraídos del Excel VRF_R-32_CARGA.xlsx, hoja R-32:
 *
 * Factores kg/m (columna E):
 *   1/4" (ø 6,35) → 0.019    3/8" (ø 9,52) → 0.049
 *   1/2" (ø 12,7) → 0.096    5/8" (ø 15,9) → 0.153
 *
 * Fórmula tubería: F_n = D_n × E_n × 1000  (gramos)
 * Fórmula potencia: J16 = H16 × 0.0238     (H16=15000 W en el ejemplo)
 * D17 = F13+F14+F15+F16
 * G19 = D17 + J16    (total gramos)
 * G20 = G19 / 1000   (total kg)
 *
 * Ejemplo del Excel: D13=10, D14/D15/D16=0, H16=15000 W
 *   F13 = 10 × 0.019 × 1000 = 190 g
 *   D17 = 190 g
 *   J16 = 15000 × 0.0238 = 357 g
 *   G19 = 190 + 357 = 547 g
 *   G20 = 0.547 kg
 */

describe('constantes del Excel', () => {
  it('factor de potencia interior = 0.0238 g/W', () => {
    expect(POWER_CHARGE_G_PER_W).toBe(0.0238)
  })

  it('verifica los 4 factores kg/m exactos del Excel', () => {
    const expected = [0.019, 0.049, 0.096, 0.153]
    VRF_R32_PIPES.forEach((p, i) => {
      expect(p.kgPerM).toBe(expected[i])
    })
  })
})

describe('calcVRF32Charge — replica ejemplo del Excel', () => {
  it('D13=10 m, resto=0, potencia=15000 W → 547 g / 0.547 kg', () => {
    const { totalGrams, totalKg, pipeGrams, powerGrams } = calcVRF32Charge(
      { p1_4: 10 },
      15000
    )
    expect(pipeGrams).toBeCloseTo(190, 6)      // 10 × 0.019 × 1000
    expect(powerGrams).toBeCloseTo(357, 6)     // 15000 × 0.0238
    expect(totalGrams).toBeCloseTo(547, 6)
    expect(totalKg).toBeCloseTo(0.547, 6)
  })
})

describe('calcVRF32Charge — cálculos individuales', () => {
  it('sin tuberías ni potencia → 0', () => {
    const { totalGrams } = calcVRF32Charge({}, 0)
    expect(totalGrams).toBe(0)
  })

  it('10 m de tubería 3/8" → 490 g de tubería', () => {
    const { pipeGrams } = calcVRF32Charge({ p3_8: 10 }, 0)
    expect(pipeGrams).toBeCloseTo(490, 6)      // 10 × 0.049 × 1000
  })

  it('10 m de tubería 1/2" → 960 g de tubería', () => {
    const { pipeGrams } = calcVRF32Charge({ p1_2: 10 }, 0)
    expect(pipeGrams).toBeCloseTo(960, 6)      // 10 × 0.096 × 1000
  })

  it('10 m de tubería 5/8" → 1530 g de tubería', () => {
    const { pipeGrams } = calcVRF32Charge({ p5_8: 10 }, 0)
    expect(pipeGrams).toBeCloseTo(1530, 6)     // 10 × 0.153 × 1000
  })

  it('sólo potencia 10000 W → 238 g de potencia', () => {
    const { powerGrams, pipeGrams } = calcVRF32Charge({}, 10000)
    expect(pipeGrams).toBe(0)
    expect(powerGrams).toBeCloseTo(238, 6)     // 10000 × 0.0238
  })

  it('todas tuberías a 1 m + 0 W → suma de factores × 1000', () => {
    const allOne = Object.fromEntries(VRF_R32_PIPES.map((p) => [p.key, 1]))
    const { pipeGrams } = calcVRF32Charge(allOne, 0)
    const expected = VRF_R32_PIPES.reduce((s, p) => s + p.kgPerM * 1000, 0)
    expect(pipeGrams).toBeCloseTo(expected, 10)
  })
})
