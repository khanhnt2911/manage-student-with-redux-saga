export function Capitalize(str: string): string {
  if (!str) return ""
  return `
    ${str[0].toUpperCase()}${str.slice(1)}
  `
}

export function MarkColor(num: number): string {
  if (num >= 8) return "green"
  if (num >= 4) return "orange"
  return "red"
}
