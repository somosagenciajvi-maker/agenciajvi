import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { useSmoothScroll } from './components/useSmoothScroll'
import { Counter, EASE, Reveal, ScaleReveal, WordReveal } from './components/motion'
import {
  ArrowIcon,
  CheckIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PlusIcon,
  SocialIcon,
  TrafficIcon,
  WhatsAppIcon,
} from './components/icons'

const WHATSAPP =
  'https://wa.me/5581995757305?text=Ol%C3%A1%2C%20vi%20a%20apresenta%C3%A7%C3%A3o%20comercial%20e%20quero%20social%20media%20e%20tr%C3%A1fego%20pago%20com%20a%20Ag%C3%AAncia%20JVI'

/* ================================================================
   CONTEÚDO DA APRESENTAÇÃO
================================================================ */
const DORES = [
  {
    n: '01',
    title: 'Posta sem estratégia',
    text: 'O perfil publica por obrigação, sem linha editorial, sem oferta e sem chamada para ação. Conteúdo bonito que não move o caixa.',
  },
  {
    n: '02',
    title: 'Impulsiona no escuro',
    text: 'Botão "impulsionar" no lugar de campanha estruturada: sem público definido, sem criativo testado e sem leitura de custo por resultado.',
  },
  {
    n: '03',
    title: 'Não sabe o que funcionou',
    text: 'Sem rastreamento, sem CRM e sem relatório. No fim do mês sobra a sensação de que "gastou" — e não de que investiu.',
  },
]

const SOCIAL_ENTREGAS = [
  'Diagnóstico de perfil e da concorrência',
  'Planejamento e linha editorial mensal',
  'Direção de arte e identidade visual dos posts',
  'Roteiro, edição e legenda de Reels',
  'Design de feed, carrosséis e stories diários',
  'Copywriting focado em autoridade e venda',
  'Calendário de publicação e agendamento',
  'Gestão de comentários e direct comercial',
  'Relatório mensal de alcance, engajamento e crescimento',
]

const TRAFEGO_ENTREGAS = [
  'Configuração de Meta Ads e Google Ads',
  'Pixel, tags e eventos de conversão rastreados',
  'Estruturação de campanhas, conjuntos e públicos',
  'Públicos frios, quentes e remarketing',
  'Criativos testados em variações (A/B)',
  'Landing page e jornada de conversão otimizadas',
  'Gestão diária de verba: escala no que vende, corte no que queima',
  'Acompanhamento de CPL, CPA, CTR e ROAS',
  'Relatório semanal com leitura e próximos passos',
]

const METODO = [
  {
    n: '01',
    title: 'Diagnóstico',
    text: 'Entendemos produto, margem, ticket, público e canais. Auditamos o perfil, os anúncios existentes e a concorrência direta.',
  },
  {
    n: '02',
    title: 'Estratégia',
    text: 'Definimos posicionamento, oferta, linha editorial, funil e as metas de custo por lead e por venda do período.',
  },
  {
    n: '03',
    title: 'Produção',
    text: 'Direção de arte, roteiro, design e copy. Conteúdo de marca e criativos de performance saem do mesmo conceito.',
  },
  {
    n: '04',
    title: 'Veiculação',
    text: 'Campanhas no ar com rastreamento correto, públicos segmentados e verba distribuída por etapa do funil.',
  },
  {
    n: '05',
    title: 'Otimização',
    text: 'Leitura de dados, corte do que não performa, escala do que vende e relatório com decisão — não só com gráfico.',
  },
]

const CRONOGRAMA = [
  {
    tag: 'Primeiros 30 dias',
    title: 'Estrutura',
    items: [
      'Acessos, pixel e rastreamento configurados',
      'Identidade visual do conteúdo definida',
      'Primeiras campanhas no ar',
      'Base de criativos em teste',
    ],
  },
  {
    tag: '60 dias',
    title: 'Tração',
    items: [
      'Criativos vencedores identificados',
      'Custo por lead em queda',
      'Perfil com ritmo de publicação constante',
      'Rotina comercial alinhada ao volume de leads',
    ],
  },
  {
    tag: '90 dias',
    title: 'Escala',
    items: [
      'Verba ampliada no que já converte',
      'Remarketing e recorrência ativos',
      'Autoridade de marca consolidada',
      'Previsibilidade de vendas mês a mês',
    ],
  },
]

const PLANOS = [
  {
    nome: 'Essencial',
    resumo: 'Para quem precisa existir bem no digital e começar a gerar demanda.',
    destaque: false,
    itens: [
      '12 publicações por mês',
      '4 Reels editados',
      'Stories em dias úteis',
      '1 campanha de tráfego ativa',
      'Relatório mensal',
    ],
  },
  {
    nome: 'Performance',
    resumo: 'Social media e tráfego pago rodando juntos, com foco em lead qualificado.',
    destaque: true,
    itens: [
      '20 publicações por mês',
      '8 Reels editados',
      'Stories diários + gestão de direct',
      'Até 3 campanhas simultâneas',
      'Testes A/B de criativo semanais',
      'Relatório semanal + reunião mensal',
    ],
  },
  {
    nome: 'Autoridade',
    resumo: 'Operação completa para marcas que querem dominar a categoria e escalar.',
    destaque: false,
    itens: [
      'Conteúdo sob demanda, sem teto fixo',
      'Reels, VSL e criativos de campanha',
      'Funil completo com remarketing',
      'Landing page dedicada por oferta',
      'Gestão de verba sem limite de campanhas',
      'Squad dedicado e reunião quinzenal',
    ],
  },
]

const COMPARATIVO = [
  { antes: 'Publicar quando sobra tempo', depois: 'Calendário editorial cumprido todo mês' },
  { antes: 'Impulsionar post no automático', depois: 'Campanhas segmentadas por etapa do funil' },
  { antes: 'Depender de indicação', depois: 'Fluxo previsível de leads todo dia' },
  { antes: 'Não saber o custo do cliente', depois: 'CPL, CPA e ROAS acompanhados de perto' },
  { antes: 'Marca parecida com todas', depois: 'Posicionamento claro e reconhecível' },
]

const FAQ = [
  {
    q: 'Em quanto tempo eu vejo resultado?',
    a: 'Tráfego pago costuma trazer os primeiros leads na primeira ou segunda semana de veiculação. Consistência de custo e volume aparece por volta do 30º ao 60º dia, quando os criativos vencedores já foram identificados. Autoridade de marca no social media é construção contínua: os efeitos mais fortes aparecem a partir do terceiro mês.',
  },
  {
    q: 'A verba de anúncio está inclusa no valor do serviço?',
    a: 'Não. O investimento em mídia é pago diretamente por você às plataformas (Meta e Google) e fica 100% no seu cartão e no seu gerenciador. Nosso valor é a gestão: estratégia, criativo, configuração, otimização e relatório.',
  },
  {
    q: 'Preciso contratar social media e tráfego juntos?',
    a: 'Não é obrigatório, mas é o que entrega o melhor resultado. O tráfego acelera a demanda e o social media sustenta a confiança de quem chega pelo anúncio. Separados, um empurra e o outro não segura.',
  },
  {
    q: 'De quem são as contas e os dados?',
    a: 'Sempre seus. Trabalhamos dentro do seu Gerenciador de Negócios, com acesso de parceiro. Se um dia a parceria terminar, campanhas, públicos, pixel e histórico continuam com você.',
  },
  {
    q: 'Vocês atendem qualquer segmento?',
    a: 'Atendemos negócios locais, serviços, comércio e infoprodutos. Antes de fechar, fazemos um diagnóstico gratuito para confirmar se o seu ticket e a sua operação comercial suportam o volume de leads que vamos gerar. Se não fizer sentido, falamos isso na reunião.',
  },
  {
    q: 'Existe fidelidade de contrato?',
    a: 'O ciclo mínimo sugerido é de 3 meses — tempo necessário para estruturar, testar e otimizar com honestidade. Não trabalhamos com multa surpresa: as condições ficam claras na proposta.',
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
          <a href="#diagnostico">Diagnóstico</a>
          <a href="#solucoes">Soluções</a>
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
              Social Media + Tráfego Pago
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
              A Agência JVI cuida das duas pontas que fazem seu negócio crescer todo mês: a
              presença que dá autoridade à sua marca e a mídia paga que coloca a oferta certa
              na frente de quem está pronto para comprar.
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
            <span>Busca, display e YouTube</span>
          </div>
          <div>
            <strong>Conteúdo</strong>
            <span>Feed, Reels e stories</span>
          </div>
          <div>
            <strong>Relatório</strong>
            <span>Dados e decisão</span>
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
            text={'Postar não é\nestratégia.'}
            stagger={0.08}
          />
          <Reveal delay={0.15}>
            <p className="lead">
              A maioria das empresas não tem um problema de produto — tem um problema de
              distribuição. O conteúdo sai sem direção, a verba é queimada no impulsionar e
              ninguém consegue dizer quanto custa conquistar um cliente. É exatamente aí que
              a JVI entra.
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
function Pilar({
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
      viewport={{ once: true, amount: 0.2 }}
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

function Solucoes() {
  return (
    <section className="section-pad" id="solucoes" style={{ background: '#040405' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            As soluções
          </p>
        </Reveal>

        <WordReveal
          as="h2"
          className="display h-xl"
          text={'Duas frentes.\nUm só objetivo: vender.'}
          stagger={0.055}
        />

        <Reveal delay={0.12}>
          <p className="lead" style={{ marginTop: 'clamp(20px, 3vw, 30px)' }}>
            Social media constrói o desejo e a confiança. Tráfego pago leva essa mensagem para
            fora da sua bolha, todos os dias, com custo medido. Juntas, as duas frentes formam
            a máquina comercial da sua marca.
          </p>
        </Reveal>

        <div className="pilares">
          <Pilar
            icon={<SocialIcon />}
            tag="Pilar 01"
            title="Social Media"
            text="Sua marca com presença profissional, ritmo constante e conteúdo que vende sem parecer anúncio."
            itens={SOCIAL_ENTREGAS}
          />
          <Pilar
            icon={<TrafficIcon />}
            tag="Pilar 02"
            title="Tráfego Pago"
            text="Campanhas estruturadas no Meta Ads e no Google Ads, com verba tratada como investimento — e cobrada por resultado."
            itens={TRAFEGO_ENTREGAS}
            delay={0.1}
          />
        </div>

        <Reveal delay={0.1}>
          <div className="chips" aria-label="Plataformas e ferramentas">
            {[
              'Meta Ads',
              'Google Ads',
              'Instagram',
              'Facebook',
              'YouTube',
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
          text={'Cinco etapas.\nZero achismo.'}
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
   05 — CRONOGRAMA 30 / 60 / 90
================================================================ */
function Cronograma() {
  return (
    <section className="section-pad" id="cronograma" style={{ background: '#040405' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Primeiros 90 dias
          </p>
        </Reveal>
        <WordReveal
          as="h2"
          className="display h-xl"
          text={'O que acontece\ndepois do sim.'}
          stagger={0.06}
        />

        <div className="fases">
          {CRONOGRAMA.map((f, i) => (
            <motion.div
              className="fase"
              key={f.tag}
              initial={{ opacity: 0, y: 48, filter: 'blur(14px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.95, ease: EASE, delay: i * 0.09 }}
            >
              <span className="fase-tag">{f.tag}</span>
              <h3 className="display">{f.title}</h3>
              <ul className="check-list">
                {f.items.map((item) => (
                  <li key={item}>
                    <span className="check">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
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
    <section className="section-pad" id="planos">
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

        <div className="compare">
          <div className="compare-head">
            <span>Antes da JVI</span>
            <span>Com a JVI</span>
          </div>
          {COMPARATIVO.map((c, i) => (
            <motion.div
              className="compare-row"
              key={c.antes}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
            >
              <span className="compare-antes">{c.antes}</span>
              <span className="compare-depois">
                <span className="check">
                  <CheckIcon />
                </span>
                {c.depois}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   08 — EQUIPE
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
          src="/art/equipe-mesa.jpg"
          alt="Equipe da Agência JVI reunida em uma mesa preta com iluminação azul"
          loading="lazy"
        />
      </motion.div>
      <div className="equipe-scrim" />

      <div className="equipe-content">
        <div className="wrap">
          <ScaleReveal>
            <p className="eyebrow" style={{ justifyContent: 'center', marginBottom: '28px' }}>
              Quem executa
            </p>
          </ScaleReveal>
          <WordReveal
            as="h2"
            className="display h-xl"
            text={'Um time por trás\nde cada campanha.'}
            stagger={0.055}
          />
          <div className="rule" />
          <Reveal delay={0.1}>
            <p className="lead" style={{ margin: '0 auto' }}>
              Estrategista, designer, redator e gestor de tráfego trabalhando no mesmo
              conceito. Você fala com quem executa — sem intermediário e sem resposta pronta.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <a className="btn" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                Agendar conversa <ArrowIcon />
              </a>
            </div>
          </Reveal>
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
    <section className="section-pad" id="faq">
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
    <section className="section-pad" id="contato" style={{ background: '#040405' }}>
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
        <Solucoes />
        <Metodo />
        <Cronograma />
        <Planos />
        <Resultados />
        <Equipe />
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
