import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useSmoothScroll } from './components/useSmoothScroll'
import { Counter, EASE, Reveal, ScaleReveal, WordReveal } from './components/motion'
import {
  ArrowIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from './components/icons'

const WHATSAPP =
  'https://wa.me/5581995757305?text=Ol%C3%A1%2C%20quero%20vender%20mais%20com%20a%20Ag%C3%AAncia%20JVI'

const SERVICES = [
  { title: 'Desenvolvimento de Sites', tag: '01 / Presença' },
  { title: 'Landing Pages', tag: '02 / Conversão' },
  { title: 'Tráfego Pago', tag: '03 / Demanda' },
  { title: 'Social Media', tag: '04 / Audiência' },
  { title: 'Branding', tag: '05 / Percepção' },
  { title: 'Consultoria Digital', tag: '06 / Estratégia' },
]

const DIFERENCIAIS = [
  {
    n: '01',
    title: 'Estratégia',
    text: 'Diagnóstico do seu mercado, do seu público e do seu funil antes de qualquer criativo entrar no ar.',
  },
  {
    n: '02',
    title: 'Posicionamento',
    text: 'Sua marca deixa de ser mais uma opção e passa a ser a escolha óbvia dentro da categoria.',
  },
  {
    n: '03',
    title: 'Conteúdo',
    text: 'Narrativa, direção de arte e ritmo de publicação que constroem autoridade todos os dias.',
  },
  {
    n: '04',
    title: 'Tráfego',
    text: 'Mídia paga gerida com dados: verba onde converte, corte onde queima orçamento.',
  },
  {
    n: '05',
    title: 'Conversão',
    text: 'Páginas, copy e jornada desenhadas para transformar clique em conversa e conversa em venda.',
  },
  {
    n: '06',
    title: 'Escalabilidade',
    text: 'Processo previsível: o que funciona vira sistema, e o sistema cresce sem depender de sorte.',
  },
]

/* ================================================================
   NAV
================================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a className="logo" href="#hero" aria-label="Agência JVI — início">
          <span className="logo-mark">JVI</span>
          <span className="logo-word">Agência</span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#problema">Problema</a>
          <a href="#oportunidade">Oportunidade</a>
          <a href="#servicos">Serviços</a>
          <a href="#resultados">Resultados</a>
          <a href="#contato">Contato</a>
        </nav>
        <a
          className="btn nav-cta"
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
        >
          Quero vender mais <ArrowIcon />
        </a>
      </div>
    </header>
  )
}

/* ================================================================
   01 — HERO
================================================================ */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section className="hero" id="hero" ref={ref}>
      <motion.div className="hero-media" style={{ y: mediaY, scale: mediaScale }}>
        <motion.img
          src="/art/hero.png"
          alt="Composição da Agência JVI com smartphones, fitas métricas e o logo JVI"
          initial={{ opacity: 0, filter: 'blur(28px)', scale: 1.12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
          fetchPriority="high"
        />
      </motion.div>
      <div className="hero-scrim" />

      <motion.div
        className="hero-orb"
        style={{ width: 620, height: 620, left: '-14%', top: '18%', background: '#0a5cff' }}
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="hero-content"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="wrap">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            style={{ marginBottom: '28px' }}
          >
            Prazer, somos a Agência JVI
          </motion.p>

          <h1
            className="display h-xxl"
            aria-label="Sua marca merece parar de depender do boca a boca."
          >
            {['Sua marca', 'merece parar', 'de depender do', 'boca a boca.'].map((line, i) => (
              <span className="reveal-line" key={line} aria-hidden="true">
                <motion.span
                  className="reveal-word"
                  initial={{ y: '112%', opacity: 0, filter: 'blur(12px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.15, ease: EASE, delay: 0.35 + i * 0.11 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.95 }}
            style={{ marginTop: 'clamp(22px, 3vw, 34px)' }}
          >
            Transformamos negócios tradicionais em máquinas de vendas digitais.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          >
            <a className="btn" href="#contato">
              Quero vender mais <ArrowIcon />
            </a>
            <a
              className="btn btn-ghost"
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.35 }}
          >
            <div>
              <strong>Estratégia</strong>
              <span>Antes do criativo</span>
            </div>
            <div>
              <strong>Performance</strong>
              <span>Mídia com dados</span>
            </div>
            <div>
              <strong>Autoridade</strong>
              <span>Marca que é lembrada</span>
            </div>
            <div>
              <strong>Escala</strong>
              <span>Vendas previsíveis</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span>Role</span>
        <span className="scroll-bar" />
      </motion.div>
    </section>
  )
}

/* ================================================================
   02 — PROBLEMA
================================================================ */
function Problema() {
  return (
    <section className="section-pad" id="problema">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            O diagnóstico
          </p>
        </Reveal>

        <div className="problema-grid">
          <WordReveal
            as="h2"
            className="display h-xl"
            text={'Seu negócio\nestá limitado.'}
            stagger={0.08}
          />
          <Reveal delay={0.15}>
            <p className="lead">
              Enquanto você depende de indicação, seus concorrentes estão construindo um sistema
              previsível de vendas online. Todo dia sem presença digital é um cliente decidindo
              por quem apareceu primeiro.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="marquee" style={{ marginTop: 'clamp(56px, 9vw, 110px)' }} aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              Do boca a boca ao digital <i>•</i> Chegamos para revolucionar o mercado{' '}
              <i>•</i> O real aumento de vendas <i>•</i> Agência JVI <i>•</i>{' '}
              Do boca a boca ao digital <i>•</i> Chegamos para revolucionar o mercado{' '}
              <i>•</i> O real aumento de vendas <i>•</i> Agência JVI <i>•</i>{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   03 — OPORTUNIDADE
================================================================ */
function Oportunidade() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1])
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className="section-pad" id="oportunidade">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            A virada
          </p>
        </Reveal>

        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Seu negócio tradicional é limitado.\nMas a Agência JVI cria oportunidade.'}
          stagger={0.045}
        />

        <div className="eyes" ref={ref}>
          <motion.img
            src="/art/olhos.png"
            alt="Close cinematográfico de um olhar atento, arte da Agência JVI"
            style={{ scale, y }}
            loading="lazy"
          />
          <span className="crosshair" />
        </div>

        <WordReveal
          as="h3"
          className="display h-lg glow-text"
          text={'A tal da oportunidade\nse chama JVI.'}
          stagger={0.06}
        />
        <Reveal delay={0.2}>
          <p
            className="display h-lg"
            style={{ color: 'rgba(255,255,255,0.9)', marginTop: '18px' }}
          >
            O real aumento de vendas.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================
   04 — SERVIÇOS
================================================================ */
function Servicos() {
  return (
    <section className="section-pad" id="servicos" style={{ background: '#040405' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Serviços
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="svc-title">
            Tudo o que <em>sua marca precisa</em> para vender online:
          </h2>
        </Reveal>

        <div className="svc-list">
          {SERVICES.map((s, i) => (
            <motion.article
              className="svc"
              key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -70 : 70, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.95, ease: EASE, delay: i * 0.06 }}
            >
              <h3>{s.title}</h3>
              <span>{s.tag}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   05 — DIFERENCIAIS
================================================================ */
function Diferenciais() {
  return (
    <section className="section-pad" id="diferenciais">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Diferenciais
          </p>
        </Reveal>
        <WordReveal as="h2" className="display h-xl" text="Por que a JVI?" stagger={0.08} />

        <div className="grid-cards">
          {DIFERENCIAIS.map((d, i) => (
            <motion.div
              className="card"
              key={d.title}
              initial={{ opacity: 0, y: 46, filter: 'blur(14px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <span className="card-num">{d.n}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   06 — RESULTADOS
================================================================ */
function Resultados() {
  return (
    <section className="section-pad" id="resultados" style={{ background: '#040405' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Resultados
          </p>
        </Reveal>
        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Do boca a boca\nao digital.'}
          stagger={0.07}
        />

        <div className="stats">
          <div className="stat">
            <Counter to={312} suffix="%" />
            <div className="stat-label">Crescimento médio</div>
          </div>
          <div className="stat">
            <Counter to={18} suffix="k+" />
            <div className="stat-label">Leads gerados</div>
          </div>
          <div className="stat">
            <Counter to={40} suffix="+" />
            <div className="stat-label">Marcas posicionadas</div>
          </div>
          <div className="stat">
            <Counter to={7} suffix="x" />
            <div className="stat-label">Mais autoridade</div>
          </div>
        </div>

        <Reveal delay={0.15}>
          <p className="lead" style={{ marginTop: 'clamp(28px, 4vw, 48px)' }}>
            Crescimento, leads, autoridade e posicionamento deixam de ser sorte e passam a ser
            consequência de um sistema que roda todos os dias.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================
   07 — EQUIPE
================================================================ */
function Equipe() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.02])

  return (
    <section className="equipe" id="equipe" ref={ref}>
      <motion.div className="equipe-media" style={{ y, scale }}>
        <img
          src="/art/equipe.png"
          alt="Equipe da Agência JVI reunida em uma mesa preta com iluminação azul"
          loading="lazy"
        />
      </motion.div>
      <div className="equipe-scrim" />

      <div className="equipe-content">
        <div className="wrap">
          <ScaleReveal>
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '28px' }}>
              A equipe
            </p>
          </ScaleReveal>
          <WordReveal
            as="h2"
            className="display h-xl"
            text={'Nossa equipe está\npronta para te atender.'}
            stagger={0.055}
          />
          <div className="rule" />
          <Reveal delay={0.1}>
            <p className="lead" style={{ margin: '0 auto' }}>
              Fale com a gente. Em poucos minutos entendemos o seu momento e mostramos o caminho
              mais curto entre a sua marca e o próximo cliente.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <a className="btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                Falar com a JVI <ArrowIcon />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   08 — CONTATO
================================================================ */
function Contato() {
  return (
    <section className="section-pad" id="contato">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Contato
          </p>
        </Reveal>
        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Vamos construir\nsua máquina de vendas.'}
          stagger={0.055}
        />

        <div className="contato-grid">
          <div className="contact-list">
            <Reveal delay={0.05}>
              <a className="contact-item glass" href="tel:+5581995757305">
                <span className="contact-icon">
                  <PhoneIcon />
                </span>
                <span>
                  <small>Telefone</small>
                  <b>+55 81 99575-7305</b>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.12}>
              <a
                className="contact-item glass"
                href="https://instagram.com/agencia.jvi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-icon">
                  <InstagramIcon />
                </span>
                <span>
                  <small>Instagram</small>
                  <b>@agencia.jvi</b>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.19}>
              <a className="contact-item glass" href="mailto:somosagenciajvi@gmail.com">
                <span className="contact-icon">
                  <MailIcon />
                </span>
                <span>
                  <small>E-mail</small>
                  <b>somosagenciajvi@gmail.com</b>
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="cta-panel glass">
              <h3 className="display h-lg" style={{ margin: 0 }}>
                Solicite seu orçamento
              </h3>
              <p className="lead" style={{ marginTop: '16px', fontSize: '1rem' }}>
                Resposta no mesmo dia útil. Sem enrolação, sem contrato surpresa — apenas o plano
                para a sua marca vender mais online.
              </p>
              <a className="btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                Solicitar orçamento <ArrowIcon />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   FOOTER + APP
================================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <a className="logo" href="#hero" aria-label="Agência JVI">
          <span className="logo-mark">JVI</span>
          <span className="logo-word">Agência</span>
        </a>
        <span>© {new Date().getFullYear()} Agência JVI — Do boca a boca ao digital</span>
        <span>Recife · PE · Brasil</span>
      </div>
    </footer>
  )
}

export default function App() {
  useSmoothScroll()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Oportunidade />
        <Servicos />
        <Diferenciais />
        <Resultados />
        <Equipe />
        <Contato />
      </main>
      <Footer />
      <a
        className="wa-float"
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <WhatsAppIcon />
      </a>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
