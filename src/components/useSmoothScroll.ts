import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

/** Resolve o alvo de uma âncora. Tenta o valor literal e, se não achar,
 *  a versão decodificada — href pode vir percent-encoded ("#se%C3%A7ao").
 *  Um "%" solto faz o decode lançar; nesse caso não é âncora nossa. */
function buscarAncora(alvo: string): HTMLElement | null {
  const direto = document.getElementById(alvo)
  if (direto) return direto
  try {
    return document.getElementById(decodeURIComponent(alvo))
  } catch {
    return null
  }
}

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
      /* getElementById, não querySelector: o href é texto livre do HTML e
         nem todo id válido é seletor CSS válido — "#01" ou "#2024" fazem o
         querySelector lançar SyntaxError, e como este handler está no
         document a exceção derruba o clique de toda a página. */
      const el = buscarAncora(id.slice(1))
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
