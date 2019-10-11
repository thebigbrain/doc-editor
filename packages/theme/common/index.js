import parse from 'parse-color'

export function fade(color, amount) {
  const [r, g, b] = parse(color).rgb
  return `rgba(${r}, ${g}, ${b}, ${amount})`
}
