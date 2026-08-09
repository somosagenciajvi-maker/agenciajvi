/* ================================================================
   LOGO JVI — versão vetorial
   Redesenho da marca que aparece nas artes da agência: três barras
   ascendentes (J / V / I) com a seta de crescimento passando por cima.
   Em vetor ela fica nítida em qualquer tamanho, de 34 px no menu ao
   tamanho de parede no fundo da abertura, e pesa alguns bytes.
================================================================ */

const BARRAS = [
  { x: 6, largura: 38, topo: 96, letra: 'J' },
  { x: 50, largura: 38, topo: 70, letra: 'V' },
  { x: 94, largura: 38, topo: 42, letra: 'I' },
]

const BASE = 150

export function LogoMark({
  className,
  seta = true,
  titulo,
}: {
  className?: string
  seta?: boolean
  titulo?: string
}) {
  return (
    <svg
      className={className}
      /* sem a seta o desenho é só o bloco de barras: a caixa acompanha,
         senão a marca fica perdida no meio de espaço vazio */
      viewBox={seta ? '0 0 148 158' : '0 36 138 120'}
      role={titulo ? 'img' : 'presentation'}
      aria-label={titulo}
      aria-hidden={titulo ? undefined : true}
      focusable="false"
    >
      {seta && (
        <path
          className="logo-seta"
          d="M8 152 C 14 104, 34 58, 78 34"
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
        />
      )}
      {seta && <path className="logo-seta-ponta" d="M64 22 L92 26 L82 53 Z" />}

      {BARRAS.map((b) => (
        <g key={b.letra}>
          <rect
            className="logo-barra"
            x={b.x}
            y={b.topo}
            width={b.largura}
            height={BASE - b.topo}
          />
          <text
            className="logo-letra"
            x={b.x + b.largura / 2}
            y={(b.topo + BASE) / 2}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {b.letra}
          </text>
        </g>
      ))}
    </svg>
  )
}

/** Marca + assinatura, para o topo e o rodapé. */
export function Logo({ href = '#topo' }: { href?: string }) {
  return (
    <a className="logo" href={href} aria-label="Agência JVI — início">
      {/* no menu a seta viraria borrão: fica só o bloco J/V/I */}
      <LogoMark className="logo-mark" seta={false} />
      <span className="logo-word">Agência</span>
    </a>
  )
}
