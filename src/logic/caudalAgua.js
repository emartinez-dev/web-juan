/**
 * Cálculo de caudal de agua en tuberías
 * Fuente: Calculo de caudal de agua en tuberias.xlsx
 *
 * Fórmulas Excel replicadas:
 *   C8  = ((C4 * ((PI() * ((C5^2)/1000) / 4))) * (3600/1000))
 *          velocidad × (π × diámetro_mm² / 1000 / 4) × 3,6          → m³/h
 *
 *   L8  = ((L4 * 1000 / 1.16 * 1000) / (L5 * L6)) / 1000000
 *          potencia_kW / (1,16 × ΔT × Ce)                            → m³/h
 *
 *   I10 = IF(C8 > L8, "CUMPLE", "NO CUMPLE")
 */

/**
 * Caudal máximo que admite una tubería
 * @param {number} velocityMps   Velocidad del agua (m/s)
 * @param {number} diameterMm    Diámetro interior de la tubería (mm)
 * @returns {number}             Caudal (m³/h)
 */
export function calcPipeFlow(velocityMps, diameterMm) {
  return velocityMps * ((Math.PI * (diameterMm ** 2 / 1000)) / 4) * (3600 / 1000)
}

/**
 * Caudal nominal requerido por el equipo
 * @param {number} powerKw  Potencia térmica del equipo (kW)
 * @param {number} deltaT   Diferencial de temperatura entrada/salida (°C)
 * @param {number} ce       Calor específico del fluido (kcal/kg·°C) — agua = 1
 * @returns {number}        Caudal (m³/h)
 */
export function calcEquipmentFlow(powerKw, deltaT, ce) {
  return ((powerKw * 1000 / 1.16) * 1000) / (deltaT * ce) / 1000000
}

/**
 * @param {number} pipeFlow       Caudal máximo de la tubería (m³/h)
 * @param {number} equipmentFlow  Caudal requerido por el equipo (m³/h)
 * @returns {'CUMPLE'|'NO CUMPLE'}
 */
export function checkFlow(pipeFlow, equipmentFlow) {
  return pipeFlow > equipmentFlow ? 'CUMPLE' : 'NO CUMPLE'
}
