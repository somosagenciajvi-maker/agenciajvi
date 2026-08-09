import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useSmoothScroll } from './components/useSmoothScroll'
import { EASE, Hairline, LineReveal, Rise } from './components/motion'
import { AdsMock, FeedMock, PageMock, SistemaDiagrama } from './components/visuals'
import {
  ArrowIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  WhatsAppIcon,
} from './components/icons'
import {
  CONTATO,
  FAQ,
  METODO,
  PILARES,
  PRINCIPIOS,
  SERVICOS,
  SISTEMA,
  type Servico,
} from './content'

const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#metodo', label: 'Método' },
  { href: '#jvi', label: 'A JVI' },
  { href: '#contato', label: 'Contato' },
]

/* ================================================================
   NAV — some ao descer, volta ao subir. Menos moldura, mais página.
================================================================ */
function Nav() {
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const last = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)
      setHidden(y > 260 && y > last.current)
      last.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${solid ? ' is-solid' : ''}${hidden ? ' is-hidden' : ''}`}>
      <div className="wrap nav-inner">
        <a className="logo" href="#topo" aria-label="Agência JVI — início">
          <span className="logo-mark">JVI</span>
          <span className="logo-word">Agência</span>
        </a>

        <nav className="nav-links" aria-label="Navegação principal">
          {NAV_LINKS.map((l) => (
            <a href={l.href} key={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn btn-sm nav-cta" href={CONTATO.whatsapp} target="_blank" rel="noopener noreferrer">
          Falar com a JVI <ArrowIcon />
        </a>
      </div>
    </header>
  )
}

/* ================================================================
   HERO — o título é o próprio índice de serviços.
================================================================ */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section className="hero" id="topo" ref={ref}>
      <div className="grid-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="hero-glow" aria-hidden="true" />

      <m.div className="wrap hero-inner" style={{ y, opacity: fade }}>
        <m.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          Agência JVI — Recife, PE
        </m.p>

        <h1 className="hero-title" aria-label="Landing page, tráfego pago e social media.">
          {SERVICOS.map((s, i) => (
            <a className="hero-line" href={`#${s.id}`} key={s.id} aria-hidden="true">
              <span className="hero-idx">{s.index}</span>
              <span className="line-mask">
                <m.span
                  className="line-inner"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.32 + i * 0.12 }}
                >
                  {s.nome}
                </m.span>
              </span>
              <span className="hero-role">{s.papel}</span>
            </a>
          ))}
        </h1>

        <m.div
          className="hero-foot"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
        >
          <p className="lead">
            Transformamos negócios tradicionais em máquinas de vendas digitais. Estas são as três
            frentes que fazem o trabalho — separadas ou como um sistema só.
          </p>
          <div className="cta-row">
            <a className="btn" href="#contato">
              Solicitar orçamento <ArrowIcon />
            </a>
            <a className="btn btn-ghost" href={CONTATO.whatsapp} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </a>
          </div>
        </m.div>

        <m.dl
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
        >
          {[
            ['Estratégia', 'Antes do criativo'],
            ['Performance', 'Mídia com dados'],
            ['Autoridade', 'Marca que é lembrada'],
            ['Escala', 'Vendas previsíveis'],
          ].map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </m.dl>
      </m.div>
    </section>
  )
}

/* ================================================================
   DIAGNÓSTICO
================================================================ */
function Diagnostico() {
  return (
    <section className="section" id="diagnostico">
      <div className="wrap">
        <div className="split">
          <div className="split-side">
            <Rise>
              <p className="tag">O diagnóstico</p>
            </Rise>
          </div>
          <div className="split-main">
            <LineReveal
              as="h2"
              className="display h-xl"
              text={'Seu negócio\nestá limitado.'}
              stagger={0.09}
            />
            <Rise delay={0.15}>
              <p className="lead lead-lg">
                Enquanto você depende de indicação, seus concorrentes estão construindo um sistema
                previsível de vendas online. Todo dia sem presença digital é um cliente decidindo
                por quem apareceu primeiro.
              </p>
            </Rise>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              Do boca a boca ao digital <i>/</i> Chegamos para revolucionar o mercado <i>/</i> O
              real aumento de vendas <i>/</i> Agência JVI <i>/</i> Do boca a boca ao digital{' '}
              <i>/</i> Chegamos para revolucionar o mercado <i>/</i> O real aumento de vendas{' '}
              <i>/</i> Agência JVI <i>/</i>{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   SISTEMA — como as três frentes se conectam
================================================================ */
function Sistema() {
  return (
    <section className="section" id="servicos">
      <div className="wrap">
        <div className="split">
          <div className="split-side">
            <Rise>
              <p className="tag">O sistema</p>
            </Rise>
          </div>
          <div className="split-main">
            <LineReveal
              as="h2"
              className="display h-lg"
              text={'Sozinha, cada frente\nentrega um pedaço.\nJuntas, viram sistema.'}
              stagger={0.08}
            />
          </div>
        </div>

        <Rise delay={0.1} className="diagrama-wrap">
          <SistemaDiagrama />
        </Rise>

        <div className="sistema-grid">
          {SISTEMA.map((s, i) => (
            <Rise delay={i * 0.08} key={s.nome}>
              <div className="sistema-item">
                <span className="idx">{s.n}</span>
                <h3>{s.nome}</h3>
                <span className="role">{s.papel}</span>
                <p>{s.texto}</p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   SERVIÇO — bloco longo, um por frente
================================================================ */
function ServicoBloco({ s, visual, flip }: { s: Servico; visual: React.ReactNode; flip: boolean }) {
  return (
    <section className={`section servico${flip ? ' is-flip' : ''}`} id={s.id}>
      <div className="wrap">
        <div className="split">
          <div className="split-side">
            <div className="svc-rail">
              <span className="svc-idx">{s.index}</span>
              <span className="svc-rule" />
              <span className="svc-name">{s.nome}</span>
              <span className="svc-role">{s.papel}</span>
            </div>
          </div>

          <div className="split-main">
            <LineReveal as="h2" className="display h-lg" text={s.titulo} stagger={0.08} />

            <Rise delay={0.12}>
              <div className="problema">
                <span className="tag">O problema</span>
                <p>{s.problema}</p>
              </div>
            </Rise>

            <Rise delay={0.18}>
              <p className="lead lead-lg">{s.texto}</p>
            </Rise>
          </div>
        </div>

        <Hairline delay={0.1} />

        <div className="servico-body">
          <div className="servico-visual">{visual}</div>

          <div className="servico-escopo">
            <Rise>
              <p className="tag">O que entra no trabalho</p>
            </Rise>
            <ul className="escopo-lista">
              {s.entra.map((item, i) => (
                <m.li
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                >
                  <span className="escopo-num">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </m.li>
              ))}
            </ul>

            <Rise>
              <p className="tag tag-blue">Você recebe</p>
            </Rise>
            <ul className="recebe-lista">
              {s.recebe.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <Rise delay={0.1}>
              <a className="btn" href={s.wa} target="_blank" rel="noopener noreferrer">
                {s.cta} <ArrowIcon />
              </a>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   MÉTODO — bloco claro, para a página respirar no meio do preto
================================================================ */
function Metodo() {
  return (
    <section className="section section-light" id="metodo">
      <div className="wrap">
        <div className="split">
          <div className="split-side">
            <Rise>
              <p className="tag">Como trabalhamos</p>
            </Rise>
          </div>
          <div className="split-main">
            <LineReveal
              as="h2"
              className="display h-lg"
              text={'Método antes\nde criativo.'}
              stagger={0.09}
            />
            <Rise delay={0.12}>
              <p className="lead lead-lg">
                Quatro etapas, sempre na mesma ordem. É o que separa uma campanha que funciona de
                uma campanha que deu sorte.
              </p>
            </Rise>
          </div>
        </div>

        <ol className="metodo-lista">
          {METODO.map((etapa, i) => (
            <m.li
              key={etapa.n}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
            >
              <span className="metodo-num">{etapa.n}</span>
              <h3>{etapa.titulo}</h3>
              <p>{etapa.texto}</p>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ================================================================
   PRINCÍPIOS
================================================================ */
function Principios() {
  return (
    <section className="section principios">
      <div className="wrap">
        <div className="split">
          <div className="split-side">
            <Rise>
              <p className="tag">Regra da casa</p>
            </Rise>
          </div>
          <div className="split-main">
            <LineReveal
              as="h2"
              className="display h-lg"
              text={'O que você não\nvai ouvir aqui.'}
              stagger={0.09}
            />
          </div>
        </div>

        <ul className="principios-lista">
          {PRINCIPIOS.map((p, i) => (
            <m.li
              key={p}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
            >
              {p}
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ================================================================
   A JVI — pilares + equipe
================================================================ */
function Jvi() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1])

  return (
    <section className="section" id="jvi">
      <div className="wrap">
        <div className="split">
          <div className="split-side">
            <Rise>
              <p className="tag">A JVI</p>
            </Rise>
          </div>
          <div className="split-main">
            <LineReveal as="h2" className="display h-lg" text={'Por que a JVI.'} stagger={0.09} />
          </div>
        </div>

        <dl className="pilares">
          {PILARES.map((p, i) => (
            <m.div
              className="pilar"
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <dt>
                <span className="idx">{p.n}</span>
                {p.titulo}
              </dt>
              <dd>{p.texto}</dd>
            </m.div>
          ))}
        </dl>
      </div>

      <div className="equipe" ref={ref}>
        <m.div className="equipe-media" style={{ y, scale }}>
          <img
            src="/art/opt/equipe-1600.webp"
            alt="Equipe da Agência JVI reunida em uma mesa preta com iluminação azul"
            loading="lazy"
            decoding="async"
          />
        </m.div>
        <div className="equipe-scrim" aria-hidden="true" />
        <span className="equipe-legenda">Agência JVI · Recife/PE</span>
        <div className="wrap equipe-content">
          <LineReveal
            as="h3"
            className="display h-md"
            text={'Nossa equipe está\npronta para te atender.'}
            stagger={0.08}
          />
          <Rise delay={0.1}>
            <p className="lead">
              Em poucos minutos entendemos o seu momento e mostramos o caminho mais curto entre a
              sua marca e o próximo cliente.
            </p>
          </Rise>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   FAQ
================================================================ */
function Faq() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <section className="section faq">
      <div className="wrap">
        <div className="split">
          <div className="split-side">
            <Rise>
              <p className="tag">Antes de perguntar</p>
            </Rise>
          </div>
          <div className="split-main">
            <LineReveal as="h2" className="display h-lg" text={'Dúvidas honestas,\nrespostas idem.'} stagger={0.09} />
          </div>
        </div>

        <div className="faq-lista">
          {FAQ.map((f, i) => {
            const open = aberta === i
            return (
              <div className={`faq-item${open ? ' is-open' : ''}`} key={f.p}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-${i}`}
                  onClick={() => setAberta(open ? null : i)}
                >
                  <span>{f.p}</span>
                  <span className="faq-icon">
                    <PlusIcon />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <m.div
                      id={`faq-${i}`}
                      className="faq-resposta"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <p>{f.r}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   CONTATO
================================================================ */
function Contato() {
  return (
    <section className="section contato" id="contato">
      <div className="wrap">
        <Rise>
          <p className="tag">Contato</p>
        </Rise>
        <LineReveal
          as="h2"
          className="display h-xl"
          text={'Vamos construir\nsua máquina de vendas.'}
          stagger={0.07}
        />

        <div className="contato-grid">
          <div className="contato-canais">
            {[
              { icon: <PhoneIcon />, label: 'Telefone', valor: CONTATO.telefone, href: CONTATO.telefoneHref },
              { icon: <InstagramIcon />, label: 'Instagram', valor: CONTATO.instagram, href: CONTATO.instagramHref },
              { icon: <MailIcon />, label: 'E-mail', valor: CONTATO.email, href: CONTATO.emailHref },
            ].map((c, i) => (
              <Rise delay={i * 0.07} key={c.label}>
                <a
                  className="canal"
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="canal-icon">{c.icon}</span>
                  <span className="canal-txt">
                    <small>{c.label}</small>
                    <b>{c.valor}</b>
                  </span>
                  <span className="canal-seta">
                    <ArrowIcon />
                  </span>
                </a>
              </Rise>
            ))}
          </div>

          <Rise delay={0.1}>
            <div className="orcamento">
              <h3 className="display h-sm">Solicite seu orçamento</h3>
              <p>
                Resposta no mesmo dia útil. Sem enrolação, sem contrato surpresa — apenas o plano
                para a sua marca vender mais online.
              </p>
              <a className="btn" href={CONTATO.whatsapp} target="_blank" rel="noopener noreferrer">
                Solicitar orçamento <ArrowIcon />
              </a>
              <span className="orcamento-nota">{CONTATO.praca}</span>
            </div>
          </Rise>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="logo" href="#topo" aria-label="Agência JVI">
          <span className="logo-mark">JVI</span>
          <span className="logo-word">Agência</span>
        </a>
        <span>© {new Date().getFullYear()} Agência JVI — Do boca a boca ao digital</span>
        <span>{CONTATO.praca}</span>
      </div>
    </footer>
  )
}

/* ================================================================
   APP
================================================================ */
export default function App() {
  useSmoothScroll()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })

  const visuais = [<PageMock key="p" />, <AdsMock key="a" />, <FeedMock key="f" />]

  return (
    /* LazyMotion + `m`: carrega só o conjunto de recursos que a página usa.
       Corta ~65 kB (gzip) em relação a importar o `motion` completo. */
    <LazyMotion features={domAnimation} strict>
      <m.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav />

      <main>
        <Hero />
        <Diagnostico />
        <Sistema />
        {SERVICOS.map((s, i) => (
          <ServicoBloco key={s.id} s={s} visual={visuais[i]} flip={i % 2 === 1} />
        ))}
        <Metodo />
        <Principios />
        <Jvi />
        <Faq />
        <Contato />
      </main>

      <Footer />

      <a
        className="wa-float"
        href={CONTATO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <WhatsAppIcon />
      </a>
      <div className="grain" aria-hidden="true" />
    </LazyMotion>
  )
}
