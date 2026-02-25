/**
 * Carga adicional R-32 para sistemas VRF
 * Fuente: VRF_R-32_CARGA.xlsx
 *
 * Fórmulas Excel replicadas:
 *   F_n  = D_n × E_n × 1000         (gramos_tubería = metros × kg_por_metro × 1000)
 *   D17  = F13 + F14 + F15 + F16    (subtotal gramos tuberías)
 *   J16  = H16 × I16                (gramos_potencia = watios × 0.0238)
 *   G19  = D17 + J16                (total gramos)
 *   G20  = G19 / 1000               (total kg)
 */

export const VRF_R32_PIPES = [
  { key: 'p1_4', label: '1/4"  (ø 6,35 mm)', kgPerM: 0.019 },
  { key: 'p3_8', label: '3/8"  (ø 9,52 mm)', kgPerM: 0.049 },
  { key: 'p1_2', label: '1/2"  (ø 12,7 mm)', kgPerM: 0.096 },
  { key: 'p5_8', label: '5/8"  (ø 15,9 mm)', kgPerM: 0.153 },
]

/** Gramos de carga adicional por vatio de potencia interior instalada */
export const POWER_CHARGE_G_PER_W = 0.0238

/**
 * @param {Record<string, number>} metersMap     Metros por clave de tubería
 * @param {number}                 interiorPowerW Potencia interior instalada (W)
 * @returns {{ pipes: Array, pipeGrams: number, powerGrams: number, totalGrams: number, totalKg: number }}
 */
export function calcVRF32Charge(metersMap, interiorPowerW) {
  const pipes = VRF_R32_PIPES.map((p) => {
    const meters = metersMap[p.key] ?? 0
    return { ...p, meters, grams: meters * p.kgPerM * 1000 }
  })
  const pipeGrams = pipes.reduce((sum, p) => sum + p.grams, 0)
  const powerGrams = interiorPowerW * POWER_CHARGE_G_PER_W
  const totalGrams = pipeGrams + powerGrams
  return { pipes, pipeGrams, powerGrams, totalGrams, totalKg: totalGrams / 1000 }
}
