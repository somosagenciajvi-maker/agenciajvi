import { m, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

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
