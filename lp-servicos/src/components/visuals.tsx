import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { EASE, useAltura, usePonteiro } from './motion'

/* Peças desenhadas à mão para cada frente. Nenhuma foto de banco de imagem:
   o que ilustra o serviço é o próprio artefato que a JVI entrega.

   Cada peça recebe o progresso de rolagem do bloco em que vive: enquanto
   o texto do serviço passa ao lado, a peça encena o que o serviço faz. */

const viewport = { once: true, amount: 0.35 } as const

export type VisualProps = { progresso: MotionValue<number> }

/* ----------------------------------------------------------------
   01 — Landing page: esqueleto de página com os pontos de conversão
   anotados, do jeito que a gente anota numa revisão de layout.

   MOVIMENTO: uma linha de leitura desce a página ao ritmo da rolagem.
   Cada bloco só acende quando ela passa — é a própria promessa do
   serviço encenada: a página conduz o visitante do topo até a ação.
---------------------------------------------------------------- */
function BlocoLido({
  p,
  limiar,
  children,
  parado,
}: {
  p: MotionValue<number>
  limiar: number
  children: ReactNode
  parado: boolean
}) {
  const opacidade = useTransform(p, [limiar - 0.1, limiar], [0.3, 1])
  const desloca = useTransform(p, [limiar - 0.1, limiar], [10, 0])
  return (
    <m.div
      style={parado ? undefined : { opacity: opacidade, y: desloca }}
      initial={parado ? undefined : { opacity: 0.3 }}
    >
      {children}
    </m.div>
  )
}

function NotaLida({
  p,
  limiar,
  top,
  label,
  parado,
}: {
  p: MotionValue<number>
  limiar: number
  top: string
  label: string
  parado: boolean
}) {
  const opacidade = useTransform(p, [limiar - 0.08, limiar], [0.28, 1])
  const escala = useTransform(p, [limiar - 0.08, limiar], [0, 1])
  const desloca = useTransform(p, [limiar - 0.08, limiar], [-8, 0])
  return (
    <m.div
      className="mock-note"
      style={parado ? { top } : { top, opacity: opacidade, x: desloca }}
    >
      <m.span
        className="mock-note-line"
        style={parado ? undefined : { scaleX: escala }}
      />
      {label}
    </m.div>
  )
}

const BLOCOS = [
  {
    limiar: 0.14,
    node: (
      <div className="mp-hero">
        <span className="mp-h1" />
        <span className="mp-h1 short" />
      </div>
    ),
  },
  {
    limiar: 0.3,
    node: (
      <div className="mp-lines">
        <span />
        <span />
        <span className="short" />
      </div>
    ),
  },
  {
    limiar: 0.48,
    node: (
      <div className="mp-proof">
        <span />
        <span />
        <span />
      </div>
    ),
  },
  {
    limiar: 0.66,
    node: (
      <div className="mp-offer">
        <span className="mp-block" />
        <span className="mp-block" />
      </div>
    ),
  },
  { limiar: 0.86, node: null },
]

const NOTAS = [
  { top: '17%', label: 'Promessa', limiar: 0.16 },
  { top: '43%', label: 'Prova', limiar: 0.46 },
  { top: '62%', label: 'Oferta', limiar: 0.66 },
  { top: '80%', label: 'Ação', limiar: 0.88 },
]

export function PageMock({ progresso }: VisualProps) {
  const semMovimento = useReducedMotion()
  const parado = !!semMovimento

  const quadro = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLDivElement>(null)
  const altura = useAltura(canvas)
  const { mx, my, ativo } = usePonteiro(quadro)

  const girarY = useTransform(mx, [-1, 1], [-3.4, 3.4])
  const girarX = useTransform(my, [-1, 1], [2.6, -2.6])

  const scanY = useTransform(progresso, [0.04, 0.96], [0, Math.max(altura - 2, 0)])
  const scanOp = useTransform(progresso, [0, 0.05, 0.9, 1], [0, 1, 1, 0])

  /* o botão é o fim da leitura: quando a linha chega nele, ele responde */
  const btnEscala = useTransform(progresso, [0.84, 0.9, 0.97], [1, 1.06, 1])

  return (
    <div className="mock-perspectiva">
      <m.div
        className="mock mock-page"
        aria-hidden="true"
        ref={quadro}
        style={ativo ? { rotateY: girarY, rotateX: girarX } : undefined}
      >
        <div className="mock-chrome">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="mock-url">suamarca.com.br/oferta</span>
        </div>

        <div className="mock-canvas" ref={canvas}>
          {!parado && (
            <m.span
              className="mock-scan"
              aria-hidden="true"
              style={{ y: scanY, opacity: scanOp }}
            />
          )}

          <div className="mock-stack">
            {BLOCOS.map((b, i) => (
              <BlocoLido key={i} p={progresso} limiar={b.limiar} parado={parado}>
                {b.node ?? (
                  <div className="mp-cta">
                    <m.span
                      className="mp-btn"
                      style={parado ? undefined : { scale: btnEscala }}
                    />
                    <span className="mp-field" />
                  </div>
                )}
              </BlocoLido>
            ))}
          </div>

          <div className="mock-notes">
            {NOTAS.map((n) => (
              <NotaLida
                key={n.label}
                p={progresso}
                limiar={n.limiar}
                top={n.top}
                label={n.label}
                parado={parado}
              />
            ))}
          </div>
        </div>
      </m.div>
    </div>
  )
}

/* ----------------------------------------------------------------
   02 — Tráfego: três criativos disputando verba. Um escala, um segue
   em teste, um é cortado. Sem números inventados: só a decisão.

   MOVIMENTO: a verba não fica parada. As barras se realocam entre
   duas leituras — o que escala engorda, o que está em teste segura,
   o que foi cortado míngua. É a gestão semanal acontecendo à vista.
---------------------------------------------------------------- */
const CRIATIVOS = [
  { nome: 'Criativo A', verba: [0.72, 0.93], estado: 'escala', marca: 'Recebe verba' },
  { nome: 'Criativo B', verba: [0.52, 0.44], estado: 'teste', marca: 'Segue em teste' },
  { nome: 'Criativo C', verba: [0.3, 0.11], estado: 'corte', marca: 'Cortado' },
]

export function AdsMock(_props: VisualProps) {
  const semMovimento = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const emVista = useInView(ref, { amount: 0.4 })
  const [fase, setFase] = useState(0)

  useEffect(() => {
    if (!emVista || semMovimento) return
    const id = window.setInterval(() => setFase((f) => (f === 0 ? 1 : 0)), 3600)
    return () => window.clearInterval(id)
  }, [emVista, semMovimento])

  return (
    <div className="mock mock-ads" aria-hidden="true" ref={ref}>
      <div className="mock-chrome">
        <span className="mock-url">Gerenciador de anúncios</span>
        <span className="mock-tag">Decisão da semana</span>
      </div>

      <div className="mock-canvas">
        {CRIATIVOS.map((c, i) => (
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
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: emVista ? c.verba[semMovimento ? 0 : fase] : 0 }}
                  transition={{
                    duration: semMovimento ? 0 : 1.5,
                    ease: EASE,
                    delay: emVista && fase === 0 ? 0.25 + i * 0.12 : i * 0.1,
                  }}
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

   MOVIMENTO: enquanto a página rola, as três colunas deslizam em
   ritmos diferentes dentro dos próprios quadros — o feed nunca está
   parado, é isso que se contrata. Ao ponteiro, o quadro apontado
   vem à frente e os vizinhos recuam: um post de cada vez.
---------------------------------------------------------------- */
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

export function FeedMock({ progresso }: VisualProps) {
  const semMovimento = useReducedMotion()
  const parada = useMotionValue(0)

  const colA = useTransform(progresso, [0, 1], [-14, 12])
  const colB = useTransform(progresso, [0, 1], [10, -12])
  const colC = useTransform(progresso, [0, 1], [-8, 16])
  const colunas = semMovimento ? [parada, parada, parada] : [colA, colB, colC]

  return (
    <div className="mock mock-feed" aria-hidden="true">
      <div className="mock-chrome">
        <span className="feed-avatar">JVI</span>
        <span className="mock-url">agencia.jvi</span>
        <span className="mock-tag">Seguir</span>
      </div>

      <div className="feed-grid">
        {TILES.map((t, i) => (
          <div className="feed-cel" key={i}>
            <m.div
              className="feed-tile"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{
                duration: 0.65,
                ease: EASE,
                delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.1,
              }}
            >
              <m.div
                className="feed-desliza"
                style={semMovimento ? undefined : { y: colunas[i % 3] }}
              >
                <img src={t.src} alt="" style={{ objectPosition: t.pos }} loading="lazy" />
              </m.div>
            </m.div>
          </div>
        ))}
      </div>
    </div>
  )
}
