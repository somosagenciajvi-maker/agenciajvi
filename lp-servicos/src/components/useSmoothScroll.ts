import Lenis from 'lenis'
import { useEffect } from 'react'

/**
 * Scroll suave via Lenis, no próprio requestAnimationFrame.
 *
 * Sem GSAP: a página não usa nenhuma animação de timeline, então carregar
 * gsap + ScrollTrigger só para girar o ticker custaria ~70 kB à toa. O
 * Lenis atualiza a posição real de scroll, então o `useScroll` do
 * framer-motion continua enxergando tudo normalmente.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let frame = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    const anchorHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]')
      if (!target) return
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el as HTMLElement, { offset: -70 })
    }

    document.addEventListener('click', anchorHandler)

    return () => {
      document.removeEventListener('click', anchorHandler)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
