import { describe, it, expect } from 'vitest'
import { calcPipeFlow, calcEquipmentFlow, checkFlow } from './caudalAgua.js'

/**
 * Valores de referencia extraídos del Excel
 * "Calculo de caudal de agua en tuberias.xlsx", hoja Hoja1:
 *
 * Caudal tubería (C8):
 *   C4=1.5 m/s, C5=200 mm
 *   =((C4*((PI()*((C5^2)/1000)/4)))*(3600/1000))
 *   = 1.5 × (π × (200²/1000) / 4) × 3.6 ≈ 169.646 m³/h
 *
 * Caudal equipo (L8):
 *   L4=500 kW, L5=5 °C, L6=1 kcal/kg·°C
 *   =((L4*1000/1.16*1000)/(L5*L6))/1000000
 *   = 500 / (1.16 × 5 × 1) ≈ 86.207 m³/h
 *
 * Comparación (I10):
 *   C8 > L8 → "CUMPLE"
 */

describe('calcPipeFlow — caudal máximo de tubería', () => {
  it('replica el ejemplo del Excel: v=1.5, D=200 → ~169.646 m³/h', () => {
    const q = calcPipeFlow(1.5, 200)
    // Cálculo manual: 1.5 × (π × 40000/1000 / 4) × 3.6 = 1.5 × π × 10 × 3.6
    expect(q).toBeCloseTo(1.5 * Math.PI * 10 * 3.6, 8)
  })

  it('v=1, D=100 mm → ~28.274 m³/h', () => {
    // 1 × (π × 10000/1000 / 4) × 3.6 = π × 2.5 × 3.6 = π × 9
    expect(calcPipeFlow(1, 100)).toBeCloseTo(Math.PI * 9, 8)
  })

  it('v=2, D=50 mm → ~14.137 m³/h', () => {
    // 2 × (π × 2500/1000 / 4) × 3.6 = 2 × π × 2.5/4 × 3.6 = 2 × π × 0.625 × 3.6 = π × 4.5
    expect(calcPipeFlow(2, 50)).toBeCloseTo(Math.PI * 4.5, 8)
  })

  it('velocidad 0 → caudal 0', () => {
    expect(calcPipeFlow(0, 200)).toBe(0)
  })
})

describe('calcEquipmentFlow — caudal nominal del equipo', () => {
  it('replica el ejemplo del Excel: 500 kW, ΔT=5, Ce=1 → ~86.207 m³/h', () => {
    const q = calcEquipmentFlow(500, 5, 1)
    expect(q).toBeCloseTo(500 / (1.16 * 5 * 1), 8)
  })

  it('100 kW, ΔT=5, Ce=1 → 500/(1.16×5) / 5 ≈ 17.241 m³/h', () => {
    expect(calcEquipmentFlow(100, 5, 1)).toBeCloseTo(100 / (1.16 * 5), 8)
  })

  it('Ce mayor → caudal menor', () => {
    const q1 = calcEquipmentFlow(100, 5, 1)
    const q2 = calcEquipmentFlow(100, 5, 1.1)
    expect(q2).toBeLessThan(q1)
  })
})

describe('checkFlow — comparación CUMPLE / NO CUMPLE', () => {
  it('tubería mayor que equipo → CUMPLE', () => {
    expect(checkFlow(169.6, 86.2)).toBe('CUMPLE')
  })

  it('tubería menor que equipo → NO CUMPLE', () => {
    expect(checkFlow(50, 86.2)).toBe('NO CUMPLE')
  })

  it('exactamente igual → NO CUMPLE (Excel usa estricto >)', () => {
    expect(checkFlow(86.2, 86.2)).toBe('NO CUMPLE')
  })

  it('replica el caso completo del Excel: v=1.5, D=200, P=500, ΔT=5, Ce=1 → CUMPLE', () => {
    const pipeQ = calcPipeFlow(1.5, 200)
    const equipQ = calcEquipmentFlow(500, 5, 1)
    expect(checkFlow(pipeQ, equipQ)).toBe('CUMPLE')
  })
})
