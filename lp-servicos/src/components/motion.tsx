import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'framer-motion'
import { useEffect, useMemo, useState, type ReactNode, type RefObject } from 'react'

/* Curva única para o site inteiro. Um easing só é o que faz a página parecer
   uma peça e não uma colagem de componentes. */
export const EASE = [0.16, 1, 0.3, 1] as const

const VIEWPORT = { once: true, amount: 0.3 } as const

/* ----------------------------------------------------------------
   Rise — entrada padrão de texto corrido e blocos.
   Sem blur: deslocamento curto e opacidade bastam, e o texto nunca
   passa por um estado ilegível.
---------------------------------------------------------------- */
export function Rise({
  children,
  delay = 0,
  y = 24,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <m.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </m.div>
  )
}

/* ----------------------------------------------------------------
   LineReveal — máscara por linha para tipografia de display.
   O texto sobe de dentro da própria caixa, como em cartaz impresso.
---------------------------------------------------------------- */
const lineContainer: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
}

const lineItem: Variants = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 1.05, ease: EASE } },
}

/* ----------------------------------------------------------------
   useHoverFino — só é verdade em aparelho com ponteiro de verdade.
   No toque, efeito de hover gruda depois do tap: aqui ele nem começa.
---------------------------------------------------------------- */
export function useHoverFino() {
  const [fino, setFino] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const ler = () => setFino(mq.matches)
    ler()
    mq.addEventListener('change', ler)
    return () => mq.removeEventListener('change', ler)
  }, [])
  return fino
}

/* ----------------------------------------------------------------
   usePonteiro — devolve dois valores amortecidos de -1 a 1 com a
   posição do ponteiro dentro do elemento. Desliga em toque e em
   movimento reduzido: nesses casos fica parado no centro.
---------------------------------------------------------------- */
export function usePonteiro(ref: RefObject<HTMLElement>) {
  const cru = { stiffness: 110, damping: 20, mass: 0.4 }
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mx = useSpring(x, cru)
  const my = useSpring(y, cru)
  const fino = useHoverFino()
  const semMovimento = useReducedMotion()
  const ativo = fino && !semMovimento

  useEffect(() => {
    const el = ref.current
    if (!el || !ativo) return
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      x.set(((e.clientX - r.left) / r.width) * 2 - 1)
      y.set(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const sair = () => {
      x.set(0)
      y.set(0)
    }
    el.addEventListener('pointermove', mover)
    el.addEventListener('pointerleave', sair)
    return () => {
      el.removeEventListener('pointermove', mover)
      el.removeEventListener('pointerleave', sair)
    }
  }, [ref, ativo, x, y])

  return { mx, my, ativo }
}

/* altura viva do elemento — para converter progresso de rolagem em px */
export function useAltura(ref: RefObject<HTMLElement>) {
  const [h, setH] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setH(el.offsetHeight))
    ro.observe(el)
    setH(el.offsetHeight)
    return () => ro.disconnect()
  }, [ref])
  return h
}

/* ----------------------------------------------------------------
   TravaTexto — o rótulo chega como mostrador de instrumento: cada
   caractere rola dentro da própria célula e trava no glifo certo,
   da esquerda para a direita.

   A célula tem a largura do caractere FINAL (o espaçador invisível
   segura a caixa) e o rolo é absoluto por cima. Assim nada de largura
   muda durante a animação: nenhum salto de layout, nenhuma linha que
   reflui. O texto acessível fica no aria-label; o rolo é decorativo.
---------------------------------------------------------------- */
const GLIFOS = 'ILTFEHKXVANMRSUZ'
const DIGITOS = '0123456789'
const PASSOS = 4

/* pseudo-aleatório determinístico: o mesmo rótulo sorteia sempre os
   mesmos glifos, então nada pisca diferente entre montagens */
function sorteio(semente: number, conjunto: string) {
  const x = Math.sin(semente * 91.7) * 43758.5453
  return conjunto[Math.floor((x - Math.floor(x)) * conjunto.length)] ?? conjunto[0]
}

export function TravaTexto({
  text,
  delay = 0,
  passo = 0.03,
}: {
  text: string
  delay?: number
  passo?: number
}) {
  const semMovimento = useReducedMotion()

  const celulas = useMemo(
    () =>
      Array.from(text).map((ch, i) => {
        const conjunto = /[0-9]/.test(ch) ? DIGITOS : GLIFOS
        return {
          ch,
          rolo: Array.from({ length: PASSOS }, (_, k) => sorteio(i * 13 + k * 7 + 1, conjunto)),
        }
      }),
    [text],
  )

  if (semMovimento) return <>{text}</>

  /* o gatilho fica no PAI, nunca no rolo: o rolo vive dentro de uma
     célula com overflow:hidden e o IntersectionObserver enxerga só a
     fatia visível dele — com limiar alto a animação jamais disparava e
     o rótulo congelava no primeiro glifo sorteado. */
  return (
    <m.span
      className="trava"
      aria-label={text}
      initial="cru"
      whileInView="travado"
      viewport={{ once: true, amount: 0.6 }}
    >
      {celulas.map((c, i) =>
        c.ch === ' ' ? (
          <span className="trava-espaco" key={i} aria-hidden="true">
            &nbsp;
          </span>
        ) : (
          <span className="trava-ch" key={i} aria-hidden="true">
            <span className="trava-fix">{c.ch}</span>
            <m.span
              className="trava-rolo"
              variants={{
                cru: { y: '0%' },
                travado: {
                  y: `-${(PASSOS / (PASSOS + 1)) * 100}%`,
                  transition: { duration: 0.46, ease: EASE, delay: delay + i * passo },
                },
              }}
            >
              {c.rolo.map((g, k) => (
                <span key={k}>{g}</span>
              ))}
              <span>{c.ch}</span>
            </m.span>
          </span>
        ),
      )}
    </m.span>
  )
}

/* ----------------------------------------------------------------
   Varredura — o gesto da peça 01 virando linguagem da página: um
   filete de leitura desce o bloco uma única vez quando ele entra em
   cena. Não é enfeite: é o que a JVI faz com o que recebe — lê de
   cima a baixo antes de decidir.
---------------------------------------------------------------- */
export function Varredura({
  children,
  className,
  delay = 0,
  duracao = 1.15,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duracao?: number
}) {
  const semMovimento = useReducedMotion()

  return (
    <div className={`varre${className ? ` ${className}` : ''}`}>
      {!semMovimento && (
        /* Dois acertos que o filete exigiu:
           1. `y` e `opacity` precisam do MESMO número de quadros-chave,
              senão o `times` não casa e a animação inteira é descartada.
           2. porcentagem em `y` é relativa à altura do PRÓPRIO elemento:
              num filete de 1px, `100%` andava um pixel. Quem anda agora é
              um trilho da altura do bloco, com o filete desenhado no topo
              dele — assim `100%` é a altura do bloco de verdade. */
        <m.span
          className="varre-trilho"
          aria-hidden="true"
          initial={{ y: '0%', opacity: 0 }}
          whileInView={{
            y: ['0%', '10%', '82%', '100%'],
            opacity: [0, 1, 1, 0],
          }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: duracao, ease: 'linear', delay, times: [0, 0.1, 0.82, 1] }}
        />
      )}
      {children}
    </div>
  )
}

/* ----------------------------------------------------------------
   Medidor — as três barras da marca funcionando como instrumento:
   elas se enchem conforme o capítulo é lido. O dado que ele mostra é
   a própria leitura da página, nada inventado.
---------------------------------------------------------------- */
function BarraMedidor({ p, faixa }: { p: MotionValue<number>; faixa: number }) {
  const escala = useTransform(p, [faixa / 3, (faixa + 1) / 3], [0, 1], { clamp: true })
  return (
    <span className="medidor-barra">
      <m.span className="medidor-fill" style={{ scaleY: escala }} />
    </span>
  )
}

export function Medidor({ p }: { p: MotionValue<number> }) {
  const semMovimento = useReducedMotion()
  const parado = useMotionValue(1)

  return (
    <span className="medidor" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <BarraMedidor key={i} p={semMovimento ? parado : p} faixa={i} />
      ))}
    </span>
  )
}

export function LineReveal({
  text,
  className,
  as = 'h2',
  stagger = 0.07,
  delay = 0,
  id,
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  stagger?: number
  delay?: number
  id?: string
}) {
  const Tag = m[as] as typeof m.h2
  const lines = text.split('\n')

  return (
    <Tag
      id={id}
      className={className}
      variants={lineContainer}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delayChildren: delay }}
      aria-label={text.replace(/\n/g, ' ')}
    >
      {lines.map((line, i) => (
        <span className="line-mask" key={i} aria-hidden="true">
          <m.span className="line-inner" variants={lineItem}>
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  )
}
