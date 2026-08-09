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
          A verba não espera o fim do mês.
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
