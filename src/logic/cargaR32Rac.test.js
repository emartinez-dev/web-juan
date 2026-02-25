import { describe, it, expect } from 'vitest'
import { calcCargaRac, RAC_RANGES } from './cargaR32Rac.js'

/**
 * Valores de referencia extraídos del Excel Rac_Lcac_R-32.xlsx:
 *
 * Rango alto (7.1-16 kW) — hoja Hoja1, filas 8-10:
 *   D9=6 (metros), E9=5 (carga fábrica), G9=24 g/m
 *   F9 = D9-E9 = 1  →  H9 = F9*G9 = 24 g
 *
 * Rango bajo (2.6-5.2 kW) — hoja Hoja1, filas 16-18:
 *   D17=0, E17=5, G17=12 g/m
 *   F17 = D17-E17 = -5  →  H17 = F17*G17 = -60 g
 */

describe('calcCargaRac — rango alto (7,1–16 kW)', () => {
  it('replica el ejemplo del Excel: 6 m → 24 g', () => {
    const { toChargeM, totalGrams } = calcCargaRac(6, 'high')
    expect(toChargeM).toBe(1)
    expect(totalGrams).toBe(24)
  })

  it('longitud igual a carga fábrica (5 m) → 0 g', () => {
    const { toChargeM, totalGrams } = calcCargaRac(5, 'high')
    expect(toChargeM).toBe(0)
    expect(totalGrams).toBe(0)
  })

  it('longitud menor a carga fábrica → resultado negativo (sin carga adicional)', () => {
    const { toChargeM, totalGrams } = calcCargaRac(3, 'high')
    expect(toChargeM).toBe(-2)
    expect(totalGrams).toBe(-48)
  })

  it('10 m → 120 g', () => {
    const { toChargeM, totalGrams } = calcCargaRac(10, 'high')
    expect(toChargeM).toBe(5)
    expect(totalGrams).toBe(120)
  })

  it('tiene carga adicional de 24 g/m y carga fábrica de 5 m', () => {
    expect(RAC_RANGES.high.additionalGPerM).toBe(24)
    expect(RAC_RANGES.high.factoryLengthM).toBe(5)
    expect(RAC_RANGES.high.tube).toBe('3/8"')
  })
})

describe('calcCargaRac — rango bajo (2,6–5,2 kW)', () => {
  it('replica el ejemplo del Excel: 0 m → −60 g', () => {
    const { toChargeM, totalGrams } = calcCargaRac(0, 'low')
    expect(toChargeM).toBe(-5)
    expect(totalGrams).toBe(-60)
  })

  it('longitud igual a carga fábrica (5 m) → 0 g', () => {
    const { toChargeM, totalGrams } = calcCargaRac(5, 'low')
    expect(toChargeM).toBe(0)
    expect(totalGrams).toBe(0)
  })

  it('10 m → 60 g', () => {
    const { toChargeM, totalGrams } = calcCargaRac(10, 'low')
    expect(toChargeM).toBe(5)
    expect(totalGrams).toBe(60)
  })

  it('tiene carga adicional de 12 g/m y carga fábrica de 5 m', () => {
    expect(RAC_RANGES.low.additionalGPerM).toBe(12)
    expect(RAC_RANGES.low.factoryLengthM).toBe(5)
    expect(RAC_RANGES.low.tube).toBe('1/4"')
  })
})
