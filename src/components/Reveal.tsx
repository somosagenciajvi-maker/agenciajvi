import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

type RevealTag = 'div' | 'li' | 'article' | 'section' | 'header' | 'p'

interface RevealProps {
  children: ReactNode
  /** Tag renderizada — use `li`/`article` para não quebrar listas e grids. */
  as?: RevealTag
  className?: string
  /** Atraso em ms, para escalonar itens de uma mesma lista. */
  delay?: number
}

export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()

  const classes = ['reveal', inView ? 'is-visible' : '', className].filter(Boolean).join(' ')
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return (
    <Tag ref={ref as never} className={classes} style={style}>
      {children}
    </Tag>
  )
}
