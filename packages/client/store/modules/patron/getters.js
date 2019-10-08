export function tier() {
  const { price } = this

  if (price >= 20) return 4
  if (price >= 15) return 3
  if (price >= 10) return 2

  return 1
}
