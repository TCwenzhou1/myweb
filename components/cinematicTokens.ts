export const C = {
  bg: '#F5F1E8',
  bgWarm: '#ECE3D4',
  bgDeep: '#DCCDB7',
  ink: '#12110F',
  inkMid: '#2A2724',
  inkDim: '#5A5149',
  inkFaint: '#91877A',

  gold: '#96703F',
  goldRich: '#B18447',
  goldChamp: '#C79E5B',
  goldPale: '#DFCEB3',

  sage: '#6F8E7B',
  sagePale: '#DDE5DA',
  graphite: '#171819',
  graphiteSoft: '#23211F',

  cardIvory: '#FBF7EF',
  cardShadow: '#CBBDA5',
}

export const FONTS = {
  display: '"Cormorant Garamond", "Bodoni Moda", "Times New Roman", Georgia, serif',
  body: '"Jost", "Inter", system-ui, sans-serif',
}

export const EASE = {
  standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  focus: 'cubic-bezier(0.33, 1, 0.68, 1)',
  exit: 'cubic-bezier(0.55, 0, 1, 0.45)',
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ]
}

export function alpha(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r},${g},${b},${a})`
}
