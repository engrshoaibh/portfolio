export function mapRange(inMin, inMax, outMin, outMax, value) {
  const clamped = Math.min(Math.max(value, inMin), inMax)
  const t = (clamped - inMin) / (inMax - inMin)
  return outMin + (outMax - outMin) * t
}

export function lerp(start, end, t) {
  return start + (end - start) * t
}


