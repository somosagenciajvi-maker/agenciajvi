import { motion, useInView, type Variants } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

/* ---------- Blur + fade + rise reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  once = true,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 1.05, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Scale reveal ---------- */
export function ScaleReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.08, filter: 'blur(18px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Word-by-word text reveal ---------- */
const wordContainer: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
}

const wordItem: Variants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(10px)' },
  show: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: EASE },
  },
}

export function WordReveal({
  text,
  className,
  as = 'h2',
  stagger = 0.055,
  delay = 0,
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  stagger?: number
  delay?: number
}) {
  const Tag = motion[as] as typeof motion.h2
  const lines = text.split('\n')

  return (
    <Tag
      className={className}
      variants={wordContainer}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delayChildren: delay }}
      aria-label={text.replace(/\n/g, ' ')}
    >
      {lines.map((line, li) => (
        <span className="reveal-line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi) => (
            <motion.span className="reveal-word" variants={wordItem} key={`${li}-${wi}`}>
              {word}
              {wi < line.split(' ').length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  )
}

/* ---------- Animated counter ---------- */
export function Counter({
  to,
  suffix = '',
  prefix = '',
  duration = 2000,
}: {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span className="stat-value" ref={ref}>
      {prefix}
      {value}
      <i>{suffix}</i>
    </span>
  )
}
