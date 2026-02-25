/**
 * Carga refrigerante R-410A para unidades VRF Midea
 * Fuente: VRF_R-410_V6.xlsx
 *
 * Fórmula Excel replicada:
 *   H_n = D_n × F_n       (kg_linea = metros × kg_por_metro)
 *   H19 = SUM(H10:H17)    (total = suma de todas las líneas)
 */

export const VRF_R410_LINES = [
  { key: 'l1_1_8', label: '1 1/8"', kgPerM: 0.68 },
  { key: 'l1',     label: '1"',     kgPerM: 0.52 },
  { key: 'l7_8',   label: '7/8"',   kgPerM: 0.36 },
  { key: 'l3_4',   label: '3/4"',   kgPerM: 0.26 },
  { key: 'l5_8',   label: '5/8"',   kgPerM: 0.17 },
  { key: 'l1_2',   label: '1/2"',   kgPerM: 0.11 },
  { key: 'l3_8',   label: '3/8"',   kgPerM: 0.057 },
  { key: 'l1_4',   label: '1/4"',   kgPerM: 0.022 },
]

/**
 * @param {Record<string, number>} metersMap  Metros por clave de línea
 * @returns {{ lines: Array, totalKg: number }}
 */
export function calcVRF410Charge(metersMap) {
  const lines = VRF_R410_LINES.map((line) => {
    const meters = metersMap[line.key] ?? 0
    return { ...line, meters, kg: meters * line.kgPerM }
  })
  const totalKg = lines.reduce((sum, l) => sum + l.kg, 0)
  return { lines, totalKg }
}
