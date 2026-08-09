import { m } from 'framer-motion'
import { EASE } from './motion'

/* Peças desenhadas à mão para cada frente. Nenhuma foto de banco de imagem:
   o que ilustra o serviço é o próprio artefato que a JVI entrega. */

const viewport = { once: true, amount: 0.35 } as const

/* ----------------------------------------------------------------
   01 — Landing page: esqueleto de página com os pontos de conversão
   anotados, do jeito que a gente anota numa revisão de layout.
---------------------------------------------------------------- */
export function PageMock() {
  const notas = [
    { top: '17%', label: 'Promessa' },
    { top: '43%', label: 'Prova' },
    { top: '62%', label: 'Oferta' },
    { top: '80%', label: 'Ação' },
  ]

  return (
    <div className="mock mock-page" aria-hidden="true">
      <div className="mock-chrome">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="mock-url">suamarca.com.br/oferta</span>
      </div>

      <div className="mock-canvas">
        <m.div
          className="mock-stack"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          {[
            <div className="mp-hero" key="hero">
              <span className="mp-h1" />
              <span className="mp-h1 short" />
            </div>,
            <div className="mp-lines" key="lead">
              <span />
              <span />
              <span className="short" />
            </div>,
            <div className="mp-proof" key="proof">
              <span />
              <span />
              <span />
            </div>,
            <div className="mp-offer" key="offer">
              <span className="mp-block" />
              <span className="mp-block" />
            </div>,
            <div className="mp-cta" key="cta">
              <span className="mp-btn" />
              <span className="mp-field" />
            </div>,
          ].map((child, i) => (
            <m.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
              }}
            >
              {child}
            </m.div>
          ))}
        </m.div>

        <div className="mock-notes">
          {notas.map((n, i) => (
            <m.div
              className="mock-note"
              key={n.label}
              style={{ top: n.top }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.12 }}
            >
              <span className="mock-note-line" />
              {n.label}
            </m.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   02 — Tráfego: três criativos disputando verba. Um escala, um segue
   em teste, um é cortado. Sem números inventados: só a decisão.
---------------------------------------------------------------- */
export function AdsMock() {
  const criativos = [
    { nome: 'Criativo A', largura: '86%', estado: 'escala', marca: 'Recebe verba' },
    { nome: 'Criativo B', largura: '54%', estado: 'teste', marca: 'Segue em teste' },
    { nome: 'Criativo C', largura: '22%', estado: 'corte', marca: 'Cortado' },
  ]

  return (
    <div className="mock mock-ads" aria-hidden="true">
      <div className="mock-chrome">
        <span className="mock-url">Gerenciador de anúncios</span>
        <span className="mock-tag">Decisão da semana</span>
      </div>

      <div className="mock-canvas">
        {criativos.map((c, i) => (
          <m.div
            className={`ad-row ad-${c.estado}`}
            key={c.nome}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.12 }}
          >
            <span className="ad-thumb" />
            <div className="ad-body">
              <div className="ad-head">
                <span className="ad-name">{c.nome}</span>
                <span className="ad-mark">{c.marca}</span>
              </div>
              <div className="ad-track">
                <m.span
                  className="ad-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: c.largura }}
                  viewport={viewport}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.25 + i * 0.12 }}
                />
              </div>
            </div>
          </m.div>
        ))}

        <m.p
          className="mock-caption"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
        >
          A verba não fica parada esperando o fim do mês.
        </m.p>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   03 — Social: o feed montado com a arte real da JVI, cada quadro
   enquadrando um pedaço diferente da mesma peça.
---------------------------------------------------------------- */
/* versões leves das artes (720 px webp): o PNG original tem 2 MB e o quadro
   do feed nunca passa de ~220 px na tela */
const TILES = [
  { src: '/art/opt/hero-720.webp', pos: '50% 18%' },
  { src: '/art/opt/olhos-720.webp', pos: '50% 42%' },
  { src: '/art/opt/servicos-720.webp', pos: '50% 30%' },
  { src: '/art/opt/equipe-720.webp', pos: '50% 24%' },
  { src: '/art/opt/hero-720.webp', pos: '78% 78%' },
  { src: '/art/opt/olhos-720.webp', pos: '50% 82%' },
  { src: '/art/opt/servicos-720.webp', pos: '50% 72%' },
  { src: '/art/opt/equipe-720.webp', pos: '50% 76%' },
  { src: '/art/opt/hero-720.webp', pos: '20% 52%' },
]

export function FeedMock() {
  return (
    <div className="mock mock-feed" aria-hidden="true">
      <div className="mock-chrome">
        <span className="feed-avatar">JVI</span>
        <span className="mock-url">agencia.jvi</span>
        <span className="mock-tag">Seguir</span>
      </div>

      <div className="feed-grid">
        {TILES.map((t, i) => (
          <m.div
            className="feed-tile"
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.65, ease: EASE, delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.1 }}
          >
            <img src={t.src} alt="" style={{ objectPosition: t.pos }} loading="lazy" />
          </m.div>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Diagrama do sistema — as três frentes em ciclo, desenhadas em SVG.
---------------------------------------------------------------- */
export function SistemaDiagrama() {
  return (
    <svg
      className="diagrama"
      viewBox="0 0 720 320"
      role="img"
      aria-label="Diagrama: social mídia constrói autoridade, tráfego pago gera demanda e a landing page converte, alimentando o ciclo de volta."
    >
      <defs>
        <marker id="seta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#0a5cff" />
        </marker>
      </defs>

      {[
        { x: 120, label: 'SOCIAL', sub: 'Autoridade' },
        { x: 360, label: 'TRÁFEGO', sub: 'Demanda' },
        { x: 600, label: 'PÁGINA', sub: 'Conversão' },
      ].map((n, i) => (
        <m.g
          key={n.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.15 }}
        >
          <circle cx={n.x} cy="118" r="62" fill="none" stroke="rgba(255,255,255,0.16)" />
          <circle cx={n.x} cy="118" r="62" fill="rgba(10,92,255,0.05)" />
          <text x={n.x} y="112" textAnchor="middle" className="dg-label">
            {n.label}
          </text>
          <text x={n.x} y="136" textAnchor="middle" className="dg-sub">
            {n.sub}
          </text>
        </m.g>
      ))}

      {[
        { d: 'M188 118 H292', delay: 0.45 },
        { d: 'M428 118 H532', delay: 0.6 },
      ].map((l) => (
        <m.path
          key={l.d}
          d={l.d}
          stroke="#0a5cff"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#seta)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: EASE, delay: l.delay }}
        />
      ))}

      {/* retorno: o dado da página volta a alimentar o conteúdo */}
      <m.path
        d="M600 190 C600 268, 120 268, 120 190"
        stroke="rgba(10,92,255,0.55)"
        strokeWidth="1.5"
        strokeDasharray="5 6"
        fill="none"
        markerEnd="url(#seta)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
      />
      <m.text
        x="360"
        y="288"
        textAnchor="middle"
        className="dg-loop"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.7, delay: 1.5 }}
      >
        O que converte na página vira briefing de criativo e pauta de conteúdo
      </m.text>
    </svg>
  )
}
