/**
 * Carga adicional R-32 para equipos RAC / LCAC
 * Fuente: Rac_Lcac_R-32.xlsx
 *
 * Fórmulas Excel replicadas:
 *   F = D - E            (total_a_cargar = longitud_total - carga_fabrica)
 *   H = F × G            (total_carga_g = total_a_cargar × carga_adicional_g_per_m)
 */

export const RAC_RANGES = {
  high: {
    label: '7,1 – 9,0 – 12,5 – 14 – 16 kW',
    tube: '3/8"',
    factoryLengthM: 5,
    additionalGPerM: 24,
  },
  low: {
    label: '2,6 – 3,5 – 5,2 kW',
    tube: '1/4"',
    factoryLengthM: 5,
    additionalGPerM: 12,
  },
}

/**
 * @param {number} totalLengthM   Longitud total de tubería de líquido (metros)
 * @param {'high'|'low'} range    Rango de potencia del equipo
 * @returns {{ toChargeM: number, totalGrams: number }}
 */
export function calcCargaRac(totalLengthM, range) {
  const cfg = RAC_RANGES[range]
  const toChargeM = totalLengthM - cfg.factoryLengthM
  const totalGrams = toChargeM * cfg.additionalGPerM
  return { toChargeM, totalGrams }
}
