import Lenis from 'lenis'
import { useEffect } from 'react'

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
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
