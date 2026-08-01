import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

/**
 * Lenis smooth scroll wired into GSAP's ticker + ScrollTrigger so every
 * scroll-driven animation stays in sync with the eased scroll position.
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

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

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
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}

export { gsap, ScrollTrigger }
