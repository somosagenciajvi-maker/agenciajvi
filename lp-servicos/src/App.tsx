import { useEffect, useRef, useState } from 'react'
import {
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useSmoothScroll } from './components/useSmoothScroll'
import {
  EASE,
  LineReveal,
  Medidor,
  Rise,
  TravaTexto,
  Varredura,
  usePonteiro,
} from './components/motion'
import { AdsMock, FeedMock, PageMock, type VisualProps } from './components/visuals'
import { Logo, LogoMark } from './components/Logo'
import { ArrowIcon, InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from './components/icons'
import { ABERTURA, CONTATO, FECHAMENTO, SEM_ATRITO, SERVICOS, type Servico } from './content'

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
          {ABERTURA.navCta} <ArrowIcon />
        </a>
      </div>
    </header>
  )
}

/* ================================================================
   GRADE VIVA — as cinco verticais da abertura eram papel de parede.
   Agora são régua: elas se montam de cima para baixo na entrada e a
   coluna sob o ponteiro acende, como a linha de um mostrador que
   responde ao dedo. Só opacidade e transform; em toque e em movimento
   reduzido a régua fica desenhada e parada.
================================================================ */
const COLUNAS = 5

function ColunaGrade({
  mx,
  presenca,
  i,
  ativo,
}: {
  mx: MotionValue<number>
  presenca: MotionValue<number>
  i: number
  ativo: boolean
}) {
  const centro = ((i + 0.5) / COLUNAS) * 2 - 1
  /* 0 longe do ponteiro, 1 sob ele. O filete base continua quase
     invisível — quem acende é o traço azul por dentro. Mexer só na
     opacidade da linha de 3,5% não dava leitura nenhuma na tela.

     A presença multiplica tudo: em repouso o ponteiro vale 0,0, que é o
     centro da abertura — sem isso a coluna do meio ficava acesa sozinha
     em toda visita, e uma régua que acende sem ninguém por perto não
     está medindo nada. */
  const acesa = useTransform(mx, (v: number) =>
    Math.max(0, 1 - Math.abs(v - centro) / (2 / COLUNAS)),
  )
  const opacidade = useTransform([acesa, presenca], ([a, p]: number[]) => (a ?? 0) * (p ?? 0))

  return (
    <m.span
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 1.3, ease: EASE, delay: 0.18 + i * 0.07 }}
    >
      {ativo && <m.i className="grid-acesa" style={{ opacity: opacidade }} />}
    </m.span>
  )
}

function GradeViva({
  mx,
  presenca,
  ativo,
}: {
  mx: MotionValue<number>
  presenca: MotionValue<number>
  ativo: boolean
}) {
  return (
    <div className="grid-lines" aria-hidden="true">
      {Array.from({ length: COLUNAS }, (_, i) => (
        <ColunaGrade key={i} mx={mx} presenca={presenca} i={i} ativo={ativo} />
      ))}
    </div>
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

  /* presença do ponteiro na abertura: 0 quando não há ninguém */
  const presencaCrua = useMotionValue(0)
  const presenca = useSpring(presencaCrua, { stiffness: 120, damping: 26, mass: 0.4 })

  return (
    <section
      className="hero"
      id="topo"
      ref={ref}
      onPointerEnter={(e) => e.pointerType === 'mouse' && presencaCrua.set(1)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && presencaCrua.set(0)}
    >
      <GradeViva mx={mx} presenca={presenca} ativo={ativo} />
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
                  transition={{
                    duration: 1.1,
                    ease: EASE,
                    delay: 0.32 + i * 0.12,
                  }}
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
          <p className="lead">{ABERTURA.lead}</p>

          {/* o botão que fecha é o azul; o que só rola virou link.
              Dois blocos de mesmo peso é uma pergunta a mais para
              quem chegou decidido. */}
          <div className="cta-bloco">
            <a className="btn" href={CONTATO.whatsapp} target="_blank" rel="noopener noreferrer">
              {ABERTURA.ctaPrimario} <ArrowIcon />
            </a>
            <p className="cta-nota">{SEM_ATRITO}</p>
            <a className="cta-seco" href={`#${SERVICOS[0]?.id ?? 'contato'}`}>
              {ABERTURA.ctaSecundario}
            </a>
          </div>
        </m.div>
      </m.div>
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

  /* o medidor da marca se calibra na chegada do capítulo: as três
     barras sobem enquanto o bloco entra em cena e travam cheias. Ele
     vive no trilho do topo, então é medido pelo que está à vista —
     amarrá-lo à leitura do capítulo inteiro deixaria o instrumento
     saindo de tela pela metade, mostrando o que ninguém veria. */
  const { scrollYProgress: pEntrada } = useScroll({
    target: secao,
    offset: ['start 0.95', 'start 0.3'],
  })
  const calibra = useSpring(pEntrada, { stiffness: 90, damping: 24, mass: 0.5 })

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
            {/* as barras da marca funcionando como instrumento: enchem
                conforme o capítulo é lido. O que medem é a leitura. */}
            <Medidor p={calibra} />
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
                <span className="tag">
                  <TravaTexto text="O problema" />
                </span>
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
              <p className="tag">
                <TravaTexto text="O que entra" />
              </p>
            </Rise>
            {/* a varredura da peça 01 vira linguagem: o filete desce a
                lista e cada item acende quando ele passa. É leitura, não
                cascata decorativa — os itens entram no ritmo da linha. */}
            <Varredura duracao={1.25}>
              <ul className="escopo-lista">
                {s.entra.map((item, i) => (
                  <m.li
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.14 + i * 0.11 }}
                  >
                    <span className="escopo-num">
                      <TravaTexto text={String(i + 1).padStart(2, '0')} delay={0.14 + i * 0.11} />
                    </span>
                    {item}
                  </m.li>
                ))}
              </ul>
            </Varredura>

            <Rise>
              <p className="tag">
                <TravaTexto text="Você recebe" />
              </p>
            </Rise>
            <ul className="recebe-lista">
              {s.recebe.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {/* o bloco fecha sozinho: quem se convenceu aqui não precisa
                procurar o fim da página para pedir */}
            <Rise delay={0.08}>
              <div className="cta-bloco cta-bloco-svc">
                <a className="btn" href={s.wa} target="_blank" rel="noopener noreferrer">
                  {s.cta} <ArrowIcon />
                </a>
                <p className="cta-nota">{SEM_ATRITO}</p>
              </div>
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
          <p className="tag">
            <TravaTexto text="Contato" />
          </p>
        </Rise>
        <LineReveal as="h2" className="display h-xl" text={FECHAMENTO.titulo} stagger={0.07} />

        {/* o fechamento parou de listar canais e passou a responder
            "o que acontece se eu mandar?" — é essa pergunta que segura
            o dedo antes do clique */}
        <div className="contato-grid">
          <Rise>
            <div className="orcamento" ref={painel}>
              <m.div
                className="orcamento-glow"
                aria-hidden="true"
                style={ativo ? { x: glowX, y: glowY } : undefined}
              />
              <p className="tag">
                <TravaTexto text={FECHAMENTO.chamada} />
              </p>

              {/* estado de calibração: os três passos chegam fora de
                  esquadro e se acertam na mesma prumada, como agulha que
                  estabiliza. O número trava por último. */}
              <ol className="passos">
                {FECHAMENTO.passos.map((p, i) => (
                  <m.li
                    key={p.n}
                    initial={{ opacity: 0, x: i % 2 === 0 ? 18 : -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.75, ease: EASE, delay: 0.1 + i * 0.13 }}
                  >
                    <span className="passo-n">
                      <TravaTexto text={p.n} delay={0.3 + i * 0.13} />
                    </span>
                    <span className="passo-txt">
                      <b>{p.t}</b>
                      <small>{p.d}</small>
                    </span>
                  </m.li>
                ))}
              </ol>

              <a
                className="btn"
                href={CONTATO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-fecho="true"
              >
                {FECHAMENTO.cta} <ArrowIcon />
              </a>
              <p className="cta-nota">{SEM_ATRITO}</p>
            </div>
          </Rise>

          <Rise delay={0.1}>
            <div className="contato-lado">
              <p className="canais-titulo">{FECHAMENTO.canaisTitulo}</p>
              <div className="contato-canais">
                {canais.map((c) => (
                  <a
                    className="canal"
                    key={c.label}
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
                ))}
              </div>
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
   BARRA DE AÇÃO — o botão flutuante era um ícone mudo que ainda por
   cima cobria a última palavra das linhas no celular. No lugar dele,
   uma prateleira ancorada na zona do polegar que sabe onde a pessoa
   está: lendo o 02, o botão fala de tráfego pago e já abre a conversa
   daquele serviço. Some sozinha quando o fechamento entra em tela —
   dois pedidos idênticos empilhados anulam um ao outro.
================================================================ */
function BarraAcao() {
  const [servico, setServico] = useState<Servico | null>(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const alvos = SERVICOS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    )
    if (!alvos.length) return

    const razoes = new Map<string, number>()
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) razoes.set(e.target.id, e.intersectionRatio)
        let idTopo = ''
        let topo = 0
        razoes.forEach((v, k) => {
          if (v > topo) {
            topo = v
            idTopo = k
          }
        })
        setServico(topo > 0.16 ? (SERVICOS.find((s) => s.id === idTopo) ?? null) : null)
      },
      { threshold: [0, 0.08, 0.16, 0.3, 0.5, 0.7, 0.9] },
    )
    alvos.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* aparece depois que a abertura sai (lá o CTA grande já está na tela)
     e se recolhe no fim: sobre o botão do fechamento ela seria o mesmo
     pedido duas vezes, e sobre o rodapé estaria cobrindo texto */
  useEffect(() => {
    const hero = document.getElementById('topo')
    if (!hero) return

    let heroFora = false
    const fim = new Set<Element>()
    const aplicar = () => setVisivel(heroFora && fim.size === 0)

    const ioHero = new IntersectionObserver(
      ([e]) => {
        heroFora = !e.isIntersecting
        aplicar()
      },
      { threshold: 0, rootMargin: '-45% 0px 0px 0px' },
    )
    ioHero.observe(hero)

    const finais = [document.querySelector('[data-fecho]'), document.querySelector('.footer')]
    const ioFim = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) fim.add(e.target)
          else fim.delete(e.target)
        }
        aplicar()
      },
      { threshold: 0 },
    )
    finais.forEach((el) => el && ioFim.observe(el))

    return () => {
      ioHero.disconnect()
      ioFim.disconnect()
    }
  }, [])

  const href = servico ? servico.wa : CONTATO.whatsapp
  const rotulo = servico ? `Falar sobre ${servico.nome}` : ABERTURA.navCta

  return (
    <div className={`barra-acao${visivel ? ' is-on' : ''}`} aria-hidden={!visivel}>
      <div className="barra-inner">
        <p className="barra-nota">{SEM_ATRITO}</p>
        <a
          className="btn barra-btn"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visivel ? 0 : -1}
        >
          <WhatsAppIcon />
          <span>{rotulo}</span>
        </a>
      </div>
    </div>
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
    /* as peças já checavam useReducedMotion; faltavam as entradas de
       texto, que continuavam subindo e revelando por máscara. O
       MotionConfig desliga o deslocamento de todas elas de uma vez —
       o conteúdo aparece, parado. */
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
        <Nav />

        <main>
          <Hero />
          {[
            /* o módulo protege o caso de content.ts ganhar um quarto serviço:
             sem ele o Visual viria undefined e o React derrubaria a página
             inteira em tela branca por causa de um item novo na lista */
            ...SERVICOS.map((s, i) => (
              <ServicoBloco key={s.id} s={s} Visual={visuais[i % visuais.length]} claro={i === 1} />
            )),
            <Contato key="contato" />,
          ].map((secao, i) => (
            <Capitulo key={secao.key} z={i + 1}>
              {secao}
            </Capitulo>
          ))}
        </main>

        <Footer />

        <BarraAcao />
        <div className="grain" aria-hidden="true" />
      </MotionConfig>
    </LazyMotion>
  )
}
