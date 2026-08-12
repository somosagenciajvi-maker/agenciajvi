import { useEffect, useState } from 'react'
import { stats, type Stat } from '../data/content'
import { useInView } from '../hooks/useInView'
import { Reveal } from './Reveal'

const DURATION = 1400

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function Counter({ stat }: { stat: Stat }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (prefersReducedMotion()) {
      setCurrent(stat.value)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1)
      // easeOutCubic: rápido no início, assenta no final.
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(stat.value * eased)

      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, stat.value])

  const formatted = current.toLocaleString('pt-BR', {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  })

  return (
    <div className="stat" ref={ref}>
      <div className="stat__value">
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </div>
      <p className="stat__label">{stat.label}</p>
    </div>
  )
}

export function Stats() {
  return (
    <section className="section stats" aria-label="Números da agência">
      <div className="container">
        <Reveal className="stats__grid">
          {stats.map((stat) => (
            <Counter stat={stat} key={stat.label} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
