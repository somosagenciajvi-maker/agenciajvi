import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { useSmoothScroll } from './components/useSmoothScroll'
import { Counter, EASE, Reveal, WordReveal } from './components/motion'
import {
  ArrowIcon,
  CheckIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  SiteIcon,
  SocialIcon,
  TrafficIcon,
  WhatsAppIcon,
} from './components/icons'

const WHATSAPP =
  'https://wa.me/5581995757305?text=Ol%C3%A1%2C%20vi%20a%20apresenta%C3%A7%C3%A3o%20comercial%20e%20quero%20social%20media%20e%20tr%C3%A1fego%20pago%20com%20a%20Ag%C3%AAncia%20JVI'

/* ================================================================
   CONTEÚDO DA APRESENTAÇÃO
================================================================ */
const SERVICOS = [
  {
    n: '01',
    icon: 'trafego' as const,
    title: 'Tráfego Pago',
    text: 'Anúncio no ar com verba tratada como investimento — e cobrado por resultado.',
    itens: [
      'Campanhas no Meta Ads e no Google Ads',
      'Públicos frios, quentes e remarketing',
      'Criativos testados em variação (A/B)',
      'Pixel e conversões rastreadas de verdade',
      'Relatório com custo por lead e por venda',
    ],
  },
  {
    n: '02',
    icon: 'site' as const,
    title: 'Criação de Sites',
    text: 'O endereço da sua marca na internet: rápido, bonito no celular e feito para converter.',
    itens: [
      'Site institucional ou landing page de venda',
      'Design exclusivo, sem tema pronto',
      'Carregamento rápido e pronto para o Google',
      'Textos escritos para vender, não para enfeitar',
      'WhatsApp e formulário integrados',
    ],
  },
  {
    n: '03',
    icon: 'social' as const,
    title: 'Social Media',
    text: 'Presença profissional, ritmo constante e conteúdo que vende sem parecer anúncio.',
    itens: [
      'Linha editorial e calendário do mês',
      'Feed, carrosséis e stories',
      'Reels roteirizados e editados',
      'Copy que constrói autoridade',
      'Relatório de alcance e crescimento',
    ],
  },
]

const DORES = [
  {
    n: '01',
    title: 'Posta sem estratégia',
    text: 'Conteúdo por obrigação, sem oferta e sem chamada para ação. Bonito, mas não move o caixa.',
  },
  {
    n: '02',
    title: 'Impulsiona no escuro',
    text: 'Botão "impulsionar" no lugar de campanha: sem público definido e sem leitura de custo.',
  },
  {
    n: '03',
    title: 'Não tem para onde mandar',
    text: 'Sem site ou página de conversão, o clique morre no perfil — e o cliente vai para o concorrente.',
  },
]

const METODO = [
  { n: '01', title: 'Diagnóstico', text: 'Produto, ticket, público e concorrência na mesa antes de qualquer criativo.' },
  { n: '02', title: 'Estratégia', text: 'Posicionamento, oferta, funil e a meta de custo por lead do período.' },
  { n: '03', title: 'Execução', text: 'Site, conteúdo e campanhas saem do mesmo conceito e entram no ar.' },
  { n: '04', title: 'Otimização', text: 'Corte no que não performa, escala no que vende, relatório com decisão.' },
]

const PLANOS = [
  {
    nome: 'Essencial',
    resumo: 'Para existir bem no digital e começar a gerar demanda.',
    destaque: false,
    itens: [
      '12 publicações por mês',
      '4 Reels editados',
      '1 campanha de tráfego ativa',
      'Relatório mensal',
    ],
  },
  {
    nome: 'Performance',
    resumo: 'As três frentes rodando juntas, com foco em lead qualificado.',
    destaque: true,
    itens: [
      '20 publicações por mês',
      '8 Reels editados',
      'Até 3 campanhas simultâneas',
      'Landing page de conversão',
      'Relatório semanal + reunião mensal',
    ],
  },
  {
    nome: 'Autoridade',
    resumo: 'Operação completa para dominar a categoria e escalar.',
    destaque: false,
    itens: [
      'Conteúdo sob demanda, sem teto fixo',
      'Site institucional completo',
      'Funil com remarketing e verba sem limite',
      'Squad dedicado e reunião quinzenal',
    ],
  },
]

const FAQ = [
  {
    q: 'Em quanto tempo eu vejo resultado?',
    a: 'Tráfego pago costuma trazer os primeiros leads na primeira ou segunda semana. Consistência de custo aparece entre o 30º e o 60º dia, quando os criativos vencedores já foram identificados. Um site novo entra no ar em 2 a 4 semanas, dependendo do escopo.',
  },
  {
    q: 'A verba de anúncio está inclusa no valor?',
    a: 'Não. O investimento em mídia é pago por você diretamente às plataformas (Meta e Google) e fica 100% no seu cartão e no seu gerenciador. Nosso valor cobre estratégia, criação, gestão e relatório.',
  },
  {
    q: 'De quem são as contas, os dados e o site?',
    a: 'Sempre seus. Trabalhamos dentro do seu Gerenciador de Negócios, com acesso de parceiro, e o site é registrado no seu domínio. Se a parceria terminar, tudo continua com você.',
  },
  {
    q: 'Existe fidelidade de contrato?',
    a: 'O ciclo mínimo sugerido é de 3 meses — o tempo de estruturar, testar e otimizar com honestidade. Sem multa surpresa: as condições ficam claras na proposta.',
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
          <img className="logo-img" src="/art/marca-jvi.png" alt="" aria-hidden="true" />
          <span className="logo-word">Agência JVI</span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#metodo">Método</a>
          <a href="#planos">Planos</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="btn nav-cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          Falar com a JVI <ArrowIcon />
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
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const logoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero-bg" aria-hidden="true" />
      <motion.div
        className="hero-orb"
        style={{ width: 560, height: 560, left: '-20%', top: '14%', background: '#0a5cff' }}
        animate={{ opacity: [0.16, 0.3, 0.16], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="wrap hero-inner">
        <div className="hero-grid">
          <motion.div className="hero-content" style={{ y: contentY, opacity: contentOpacity }}>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              style={{ marginBottom: '24px' }}
            >
              Tráfego Pago · Sites · Social Media
            </motion.p>

            <h1
              className="display h-hero"
              aria-label="Conteúdo que constrói marca. Anúncio que gera venda."
            >
              {['Conteúdo que', 'constrói marca.', 'Anúncio que', 'gera venda.'].map((line, i) => (
                <span className="reveal-line" key={line} aria-hidden="true">
                  <motion.span
                    className={`reveal-word${i > 1 ? ' text-blue' : ''}`}
                    initial={{ y: '112%', opacity: 0, filter: 'blur(12px)' }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.15, ease: EASE, delay: 0.3 + i * 0.11 }}
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
              transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
              style={{ marginTop: 'clamp(16px, 2.2vw, 24px)' }}
            >
              A Agência JVI cuida das três frentes que fazem seu negócio crescer todo mês:
              o anúncio que traz gente nova, o site que transforma clique em conversa e o
              conteúdo que faz sua marca ser lembrada.
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 1.1 }}
            >
              <a className="btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                Quero um diagnóstico gratuito <ArrowIcon />
              </a>
              <a className="btn btn-ghost" href="#planos">
                Ver planos
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-logo"
            style={{ y: logoY }}
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(26px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
          >
            <img src="/art/logo-jvi.png" alt="Logotipo da Agência JVI" fetchPriority="high" />
            <span className="hero-logo-glow" aria-hidden="true" />
          </motion.div>
        </div>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
        >
          <div>
            <strong>Meta Ads</strong>
            <span>Instagram e Facebook</span>
          </div>
          <div>
            <strong>Google Ads</strong>
            <span>Busca e YouTube</span>
          </div>
          <div>
            <strong>Sites</strong>
            <span>Institucional e landing</span>
          </div>
          <div>
            <strong>Conteúdo</strong>
            <span>Feed, Reels e stories</span>
          </div>
        </motion.div>
      </div>

    </section>
  )
}

/* ================================================================
   02 — DIAGNÓSTICO
================================================================ */
function Diagnostico() {
  return (
    <section className="section-pad" id="diagnostico">
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
            text={'Aparecer é fácil.\nVender é método.'}
            stagger={0.08}
          />
          <Reveal delay={0.15}>
            <p className="lead">
              A maioria das empresas não tem problema de produto — tem problema de
              distribuição. O conteúdo sai sem direção, a verba é queimada no impulsionar e
              o clique não tem para onde ir. É aí que a JVI entra.
            </p>
          </Reveal>
        </div>

        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {DORES.map((d, i) => (
            <motion.div
              className="card"
              key={d.n}
              initial={{ opacity: 0, y: 46, filter: 'blur(14px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, ease: EASE, delay: i * 0.08 }}
            >
              <span className="card-num">{d.n}</span>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="marquee" style={{ marginTop: 'clamp(56px, 9vw, 110px)' }} aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              Social Media <i>•</i> Tráfego Pago <i>•</i> Estratégia <i>•</i> Criativo{' '}
              <i>•</i> Conversão <i>•</i> Agência JVI <i>•</i> Social Media <i>•</i>{' '}
              Tráfego Pago <i>•</i> Estratégia <i>•</i> Criativo <i>•</i> Conversão{' '}
              <i>•</i> Agência JVI <i>•</i>{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   03 — SOLUÇÕES (PILARES)
================================================================ */
function Servico({
  icon,
  tag,
  title,
  text,
  itens,
  delay = 0,
}: {
  icon: ReactNode
  tag: string
  title: string
  text: string
  itens: string[]
  delay?: number
}) {
  return (
    <motion.article
      className="pilar glass"
      initial={{ opacity: 0, y: 54, filter: 'blur(16px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      <div className="pilar-head">
        <span className="pilar-icon">{icon}</span>
        <span className="pilar-tag">{tag}</span>
      </div>
      <h3 className="display h-lg">{title}</h3>
      <p className="pilar-text">{text}</p>
      <ul className="check-list">
        {itens.map((item) => (
          <li key={item}>
            <span className="check">
              <CheckIcon />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

const ICONES = {
  trafego: <TrafficIcon />,
  site: <SiteIcon />,
  social: <SocialIcon />,
}

function Servicos() {
  return (
    <section className="section-pad" id="servicos" style={{ background: '#040405' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Serviços
          </p>
        </Reveal>

        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Três frentes.\nUm objetivo: vender.'}
          stagger={0.055}
        />

        <Reveal delay={0.12}>
          <p className="lead" style={{ marginTop: 'clamp(20px, 3vw, 30px)' }}>
            Contrate uma frente ou as três. Juntas, elas formam o caminho completo: o anúncio
            atrai, o site converte e o conteúdo sustenta a confiança de quem ainda não comprou.
          </p>
        </Reveal>

        <div className="pilares pilares-3">
          {SERVICOS.map((s, i) => (
            <Servico
              key={s.title}
              icon={ICONES[s.icon]}
              tag={`Serviço ${s.n}`}
              title={s.title}
              text={s.text}
              itens={s.itens}
              delay={i * 0.08}
            />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="chips" aria-label="Plataformas e ferramentas">
            {[
              'Meta Ads',
              'Google Ads',
              'Instagram',
              'WhatsApp Business',
              'Google Analytics',
              'Looker Studio',
            ].map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================
   04 — MÉTODO
================================================================ */
function Metodo() {
  return (
    <section className="section-pad" id="metodo">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            O método JVI
          </p>
        </Reveal>
        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Como a gente\ntrabalha.'}
          stagger={0.07}
        />

        <div className="steps">
          {METODO.map((s, i) => (
            <motion.div
              className="step"
              key={s.n}
              initial={{ opacity: 0, x: -46, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
            >
              <span className="step-num">{s.n}</span>
              <div className="step-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   06 — PLANOS
================================================================ */
function Planos() {
  return (
    <section className="section-pad" id="planos" style={{ background: '#040405' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Planos
          </p>
        </Reveal>
        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Escolha o tamanho\nda sua operação.'}
          stagger={0.06}
        />

        <Reveal delay={0.12}>
          <p className="lead" style={{ marginTop: 'clamp(20px, 3vw, 30px)' }}>
            Todo plano começa com diagnóstico gratuito. O escopo final e o investimento são
            definidos na proposta, de acordo com o seu segmento, o seu ticket e o volume de
            demanda que você precisa gerar.
          </p>
        </Reveal>

        <div className="planos">
          {PLANOS.map((p, i) => (
            <motion.article
              className={`plano glass${p.destaque ? ' plano-destaque' : ''}`}
              key={p.nome}
              initial={{ opacity: 0, y: 52, filter: 'blur(16px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
            >
              {p.destaque && <span className="plano-badge">Mais contratado</span>}
              <h3 className="display">{p.nome}</h3>
              <p className="plano-resumo">{p.resumo}</p>
              <ul className="check-list">
                {p.itens.map((item) => (
                  <li key={item}>
                    <span className="check">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="plano-preco">
                <small>Investimento</small>
                <b>Sob proposta</b>
              </div>
              <a
                className={`btn${p.destaque ? '' : ' btn-ghost'}`}
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar proposta <ArrowIcon />
              </a>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="nota">
            A verba de anúncio é paga por você diretamente às plataformas e permanece 100% na
            sua conta. Nosso valor cobre estratégia, criação, gestão e relatório.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ================================================================
   07 — RESULTADOS
================================================================ */
function Resultados() {
  return (
    <section className="section-pad" id="resultados">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Resultados
          </p>
        </Reveal>
        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Do boca a boca\nao previsível.'}
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

      </div>
    </section>
  )
}

/* ================================================================
   09 — FAQ
================================================================ */
function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-pad" id="faq" style={{ background: '#040405' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Perguntas frequentes
          </p>
        </Reveal>
        <WordReveal as="h2" className="display h-xl" text="Antes de fechar." stagger={0.08} />

        <div className="faq">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className={`faq-item${isOpen ? ' open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <PlusIcon />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq-a"
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   10 — CONTATO
================================================================ */
function Contato() {
  return (
    <section className="section-pad" id="contato">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Próximo passo
          </p>
        </Reveal>
        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Vamos montar sua\nmáquina de vendas.'}
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
                Diagnóstico gratuito
              </h3>
              <p className="lead" style={{ marginTop: '16px', fontSize: '1rem' }}>
                Em 30 minutos analisamos seu perfil, seus anúncios e sua concorrência — e
                mostramos, na prática, o que precisa mudar para o seu negócio vender mais
                online. Sem compromisso.
              </p>
              <ol className="passos">
                <li>Conversa de diagnóstico</li>
                <li>Proposta com escopo e investimento</li>
                <li>Kickoff e campanhas no ar</li>
              </ol>
              <a className="btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp <ArrowIcon />
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
          <img className="logo-img" src="/art/marca-jvi.png" alt="" aria-hidden="true" />
          <span className="logo-word">Agência JVI</span>
        </a>
        <span>© {new Date().getFullYear()} Agência JVI — Social Media &amp; Tráfego Pago</span>
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
        <Diagnostico />
        <Servicos />
        <Metodo />
        <Planos />
        <Resultados />
        <Faq />
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
