import { useEffect, useState } from 'react'
import { navLinks, site } from '../data/content'
import { useScrolled } from '../hooks/useScrolled'
import { ArrowRight } from './Icons'

export function Header() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  // Fecha o menu ao voltar para o desktop, evitando um menu aberto invisível.
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 900px)')
    const close = () => setOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [open])

  return (
    <header className={`header${scrolled || open ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a className="logo" href="#topo" aria-label={`${site.name} — início`}>
          JVI
          <span className="logo__dot" aria-hidden="true" />
        </a>

        <nav className="nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} className="nav__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="btn header__cta" href="#contato">
            Fale com a gente
            <ArrowRight className="btn__arrow" />
          </a>

          <button
            className="burger"
            type="button"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="burger__bar" />
            <span className="burger__bar" />
            <span className="burger__bar" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-menu" id="menu-mobile" aria-label="Navegação mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              className="mobile-menu__link"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className="btn" href="#contato" onClick={() => setOpen(false)}>
            Fale com a gente
            <ArrowRight className="btn__arrow" />
          </a>
        </nav>
      )}
    </header>
  )
}
