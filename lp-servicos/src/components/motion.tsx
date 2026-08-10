import { m, useMotionValue, useReducedMotion, useSpring, type Variants } from 'framer-motion'
import { useEffect, useState, type ReactNode, type RefObject } from 'react'

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
