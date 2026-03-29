/**
 * Carga refrigerante R-410A para unidades VRF Midea
 * Fuente: VRF_R-410_V6.xlsx
 *
 * Tres tipos de sistema: V6, V8, V6R
 *
 * V6:  carga = tubería (tabla V6)
 * V8:  carga = tubería (tabla V6) + carga adicional por HP
 * V6R: carga = tubería (tabla V6R) + carga por caja MS + carga por unidad exterior
 */

// --- Tubería (común a V6, V8 y V6R — mismos diámetros y factores) ---

export const PIPE_LINES = [
  { key: 'l1_1_8', label: '1 1/8" (Φ 28,6)', diameterMm: 28.6, kgPerM: 0.68 },
  { key: 'l1',     label: '1" (Φ 25,4)',      diameterMm: 25.4, kgPerM: 0.52 },
  { key: 'l7_8',   label: '7/8" (Φ 22,2)',    diameterMm: 22.2, kgPerM: 0.36 },
  { key: 'l3_4',   label: '3/4" (Φ 19,1)',    diameterMm: 19.1, kgPerM: 0.26 },
  { key: 'l5_8',   label: '5/8" (Φ 15,9)',    diameterMm: 15.9, kgPerM: 0.17 },
  { key: 'l1_2',   label: '1/2" (Φ 12,7)',    diameterMm: 12.7, kgPerM: 0.11 },
  { key: 'l3_8',   label: '3/8" (Φ 9,53)',    diameterMm: 9.53, kgPerM: 0.057 },
  { key: 'l1_4',   label: '1/4" (Φ 6,35)',    diameterMm: 6.35, kgPerM: 0.022 },
]

// --- V8: carga adicional por HP ---

export const V8_HP_CHARGE = [
  { hp: 8,  kg: 0 },
  { hp: 10, kg: 0 },
  { hp: 12, kg: 0 },
  { hp: 14, kg: 0 },
  { hp: 16, kg: 0 },
  { hp: 18, kg: 0 },
  { hp: 20, kg: 0 },
  { hp: 22, kg: 0 },
  { hp: 24, kg: 0 },
  { hp: 26, kg: 7 },
  { hp: 28, kg: 9 },
  { hp: 30, kg: 9 },
  { hp: 32, kg: 9 },
]

// --- V6R: cajas MS ---

export const V6R_MS_BOXES = [
  { model: 'MS01/N1-D', kg: 0.1 },
  { model: 'MS04/N1-D', kg: 0.5 },
  { model: 'MS06/N1-D', kg: 0.5 },
  { model: 'MS10/N1-D', kg: 1.0 },
]

// --- V6R: unidades exteriores ---

export const V6R_OUTDOOR_UNITS = [
  { model: '8 CV',  kg: 2.0 },
  { model: '10 CV', kg: 2.0 },
  { model: '12 CV', kg: 2.6 },
  { model: '14 CV', kg: 4.9 },
  { model: '16 CV', kg: 5.5 },
  { model: '18 CV', kg: 5.7 },
]

// --- Cálculos ---

function calcPipeCharge(metersMap) {
  const lines = PIPE_LINES.map((line) => {
    const meters = metersMap[line.key] ?? 0
    return { ...line, meters, kg: meters * line.kgPerM }
  })
  const totalKg = lines.reduce((sum, l) => sum + l.kg, 0)
  return { lines, totalKg }
}

/** V6: solo tubería */
export function calcV6(metersMap) {
  const pipes = calcPipeCharge(metersMap)
  return { pipes, totalKg: pipes.totalKg }
}

/** V8: tubería + carga por HP */
export function calcV8(metersMap, hp) {
  const pipes = calcPipeCharge(metersMap)
  const hpEntry = V8_HP_CHARGE.find((e) => e.hp === hp)
  const hpKg = hpEntry ? hpEntry.kg : 0
  return { pipes, hpKg, totalKg: pipes.totalKg + hpKg }
}

/** V6R: tubería + cajas MS + unidad exterior */
export function calcV6R(metersMap, msBoxCounts, outdoorModel) {
  const pipes = calcPipeCharge(metersMap)

  const msLines = V6R_MS_BOXES.map((box) => {
    const count = msBoxCounts[box.model] ?? 0
    return { ...box, count, kg: count * box.kg }
  })
  const msKg = msLines.reduce((sum, l) => sum + l.kg, 0)

  const outdoorEntry = V6R_OUTDOOR_UNITS.find((u) => u.model === outdoorModel)
  const outdoorKg = outdoorEntry ? outdoorEntry.kg : 0

  return { pipes, msLines, msKg, outdoorModel, outdoorKg, totalKg: pipes.totalKg + msKg + outdoorKg }
}

// Backwards compatibility
export const VRF_R410_LINES = PIPE_LINES
export function calcVRF410Charge(metersMap) {
  return calcV6(metersMap)
}
