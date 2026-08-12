/**
 * Arte gerada em SVG para os cards de case — placeholder enquanto as imagens
 * reais dos projetos não entram. Troque por <img> quando tiver o material.
 */

const palettes = [
  ['#d7ff3e', '#1a1d22'],
  ['#7c9cff', '#12141a'],
  ['#ff8a5c', '#191216'],
  ['#5cf0c4', '#101a18'],
]

export function CasePoster({ variant, label }: { variant: number; label: string }) {
  const [accent, base] = palettes[variant % palettes.length]
  const id = `poster-${variant}`

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={base} />
          <stop offset="100%" stopColor="#08090b" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.7" cy="0.25" r="0.7">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      <rect width="800" height="600" fill={`url(#${id}-glow)`} />

      <g stroke={accent} strokeOpacity="0.35" fill="none" strokeWidth="1.5">
        <circle cx="560" cy="200" r="120" />
        <circle cx="560" cy="200" r="180" />
        <circle cx="560" cy="200" r="240" />
      </g>

      <g fill={accent}>
        <rect x="80" y="430" width="180" height="8" rx="4" />
        <rect x="80" y="458" width="110" height="8" rx="4" opacity="0.55" />
        <rect x="80" y="486" width="64" height="8" rx="4" opacity="0.3" />
      </g>

      <path
        d="M80 120h150l60 90-60 90H80l60-90-60-90Z"
        fill={accent}
        fillOpacity="0.85"
      />
    </svg>
  )
}
