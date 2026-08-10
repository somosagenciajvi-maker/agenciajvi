import { useEffect, useRef, useState } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useSmoothScroll } from './components/useSmoothScroll'
import { EASE, LineReveal, Rise, usePonteiro } from './components/motion'
import { AdsMock, FeedMock, PageMock, type VisualProps } from './components/visuals'
import { Logo, LogoMark } from './components/Logo'
import { ArrowIcon, InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './components/icons'
import { CONTATO, SERVICOS, type Servico } from './content'

/* ================================================================
   NAV — os links são os próprios serviços. A página é só isso.
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
        <Logo />

        <nav className="nav-links" aria-label="Navegação principal">
          {SERVICOS.map((s) => (
            <a href={`#${s.id}`} key={s.id}>
              {s.nome}
            </a>
          ))}
        </nav>

        <a
          className="btn btn-sm nav-cta"
          href={CONTATO.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar com a JVI <ArrowIcon />
        </a>
      </div>
    </header>
  )
}

/* ================================================================
   ABERTURA — o título é o índice dos três serviços.
================================================================ */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const marcaY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  /* a marca de parede deixa de ser adesivo: ela se desloca contra o
     ponteiro, como um objeto atrás do vidro do título */
  const { mx, my, ativo } = usePonteiro(ref)
  const marcaX = useTransform(mx, [-1, 1], [26, -26])
  const marcaDy = useTransform(my, [-1, 1], [18, -18])

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

      <m.div
        className="hero-marca"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.14 }}
        animate={{ opacity: 0.13, scale: 1 }}
        transition={{ duration: 2, ease: EASE, delay: 0.15 }}
        style={{ y: marcaY }}
      >
        <m.div
          className="hero-marca-desenha"
          style={ativo ? { x: marcaX, y: marcaDy } : undefined}
        >
          <LogoMark />
        </m.div>
      </m.div>

      <m.div className="wrap hero-inner" style={{ y, opacity: fade }}>
        <m.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          Agência JVI — Recife, PE
        </m.p>

        <h1 className="hero-title" aria-label="Landing page, tráfego pago e social mídia.">
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
            Três frentes para a sua marca parar de depender do boca a boca. Cada uma resolve um
            problema diferente e nenhuma precisa das outras para funcionar.
          </p>
          <div className="cta-row">
            <a className="btn" href="#contato">
              Solicitar orçamento <ArrowIcon />
            </a>
            <a
              className="btn btn-ghost"
              href={CONTATO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
            </a>
          </div>
        </m.div>
      </m.div>

      <m.a
        className="scroll-cue"
        href={`#${SERVICOS[0]?.id ?? 'contato'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.3 }}
        style={{ opacity: fade }}
      >
        <span>Ver as três frentes</span>
        <span className="scroll-cue-line" />
      </m.a>
    </section>
  )
}

/* ================================================================
   CAPÍTULO — a seção que sai recua e escurece enquanto a próxima
   chega inteira por cima. O recuo é para o centro, então o que
   aparece nas bordas é o próprio preto da página: nenhuma fresta.
================================================================ */
function Capitulo({ children, z }: { children: React.ReactNode; z: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const semMovimento = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['end end', 'end start'] })
  /* o recuo tem que ter peso: a seção que sai vai para trás e sobe um
     pouco, como página virada. O que aparece na borda é o preto da
     página, então não abre fresta. */
  const escala = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const recuo = useTransform(scrollYProgress, [0, 1], [0, -46])
  const veu = useTransform(scrollYProgress, [0, 1], [0, 0.88])

  if (semMovimento) {
    return (
      <div className="capitulo" style={{ zIndex: z }}>
        {children}
      </div>
    )
  }

  return (
    <m.div className="capitulo" ref={ref} style={{ zIndex: z, scale: escala, y: recuo }}>
      {children}
      <m.div className="capitulo-veu" style={{ opacity: veu }} aria-hidden="true" />
    </m.div>
  )
}

/* ================================================================
   SERVIÇO — a mesma partitura nas três frentes: o problema, a
   resposta, o que entra, o que você recebe, o convite. Repetir a
   estrutura é o que deixa as três comparáveis num relance.

   O bloco do meio vai sobre papel. O corte claro no miolo da página
   marca onde um capítulo termina e o outro começa.
================================================================ */
function ServicoBloco({
  s,
  Visual,
  claro,
}: {
  s: Servico
  Visual: React.ComponentType<VisualProps>
  claro: boolean
}) {
  const semMovimento = useReducedMotion()
  const secao = useRef<HTMLElement>(null)
  const corpo = useRef<HTMLDivElement>(null)

  /* o filete do índice mede quanto do capítulo você já leu */
  const { scrollYProgress: pSecao } = useScroll({
    target: secao,
    offset: ['start start', 'end end'],
  })
  const lido = useSpring(pSecao, { stiffness: 120, damping: 28, mass: 0.4 })

  /* e a peça ilustrativa encena o serviço no ritmo da coluna ao lado */
  const { scrollYProgress: pCorpo } = useScroll({
    target: corpo,
    offset: ['start 0.82', 'end 0.72'],
  })

  return (
    <section className={`section servico${claro ? ' is-claro' : ''}`} id={s.id} ref={secao}>
      <div className="wrap">
        <div className="servico-topo">
          <div className="svc-rail">
            <span className="svc-idx">{s.index}</span>
            <span className="svc-rule">
              <m.span
                className="svc-rule-fill"
                style={semMovimento ? undefined : { scaleX: lido }}
              />
            </span>
            <span className="svc-name">{s.nome}</span>
            <span className="svc-role">{s.papel}</span>
          </div>

          <div className="servico-abertura">
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

        <div className="servico-corpo" ref={corpo}>
          <div className="servico-visual">
            <Visual progresso={pCorpo} />
          </div>

          <div className="servico-escopo">
            <Rise>
              <p className="tag">O que entra</p>
            </Rise>
            <ul className="escopo-lista">
              {s.entra.map((item, i) => (
                <m.li
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
                >
                  <span className="escopo-num">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </m.li>
              ))}
            </ul>

            <Rise>
              <p className="tag">Você recebe</p>
            </Rise>
            <ul className="recebe-lista">
              {s.recebe.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <Rise delay={0.08}>
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
   FECHAMENTO
================================================================ */
function Contato() {
  /* o painel de orçamento acende na direção de quem chega nele:
     o halo azul persegue o ponteiro em vez de ficar de enfeite na quina */
  const painel = useRef<HTMLDivElement>(null)
  const { mx, my, ativo } = usePonteiro(painel)
  const glowX = useTransform(mx, [-1, 1], [-95, 95])
  const glowY = useTransform(my, [-1, 1], [-70, 70])

  const canais = [
    {
      icon: <PhoneIcon />,
      label: 'Telefone',
      valor: CONTATO.telefone,
      href: CONTATO.telefoneHref,
    },
    {
      icon: <InstagramIcon />,
      label: 'Instagram',
      valor: CONTATO.instagram,
      href: CONTATO.instagramHref,
    },
    {
      icon: <MailIcon />,
      label: 'E-mail',
      valor: CONTATO.email,
      href: CONTATO.emailHref,
    },
  ]

  return (
    <section className="section contato" id="contato">
      <div className="wrap">
        <Rise>
          <p className="tag">Contato</p>
        </Rise>
        <LineReveal
          as="h2"
          className="display h-xl"
          text={'Comece por uma frente.\nOu pelas três.'}
          stagger={0.07}
        />

        <div className="contato-grid">
          <div className="contato-canais">
            {canais.map((c, i) => (
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
            <div className="orcamento" ref={painel}>
              <m.div
                className="orcamento-glow"
                aria-hidden="true"
                style={ativo ? { x: glowX, y: glowY } : undefined}
              />
              <h3 className="display h-sm">Solicite seu orçamento</h3>
              <p>
                Conte o que você vende e para quem. A gente responde no mesmo dia útil com escopo,
                prazo e valor por escrito.
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
        <Logo />
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

  const visuais = [PageMock, AdsMock, FeedMock]

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <Nav />

      <main>
        <Hero />
        {[
          /* o módulo protege o caso de content.ts ganhar um quarto serviço:
             sem ele o Visual viria undefined e o React derrubaria a página
             inteira em tela branca por causa de um item novo na lista */
          ...SERVICOS.map((s, i) => (
            <ServicoBloco
              key={s.id}
              s={s}
              Visual={visuais[i % visuais.length]}
              claro={i === 1}
            />
          )),
          <Contato key="contato" />,
        ].map((secao, i) => (
          <Capitulo key={secao.key} z={i + 1}>
            {secao}
          </Capitulo>
        ))}
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
