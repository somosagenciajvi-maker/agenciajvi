/**
 * Todo o conteúdo editável da landing page fica aqui.
 * Para mudar textos do site, edite este arquivo — os componentes só consomem.
 */

export const site = {
  name: 'Agência JVI',
  email: 'somosagenciajvi@gmail.com',
  whatsapp: '+55 (11) 90000-0000',
  instagram: '@agenciajvi',
  city: 'São Paulo, Brasil',
}

export const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Cases', href: '#cases' },
  { label: 'Contato', href: '#contato' },
]

export const heroMeta = [
  { value: '+120', label: 'projetos entregues' },
  { value: '8 anos', label: 'construindo marcas' },
  { value: '4.9/5', label: 'avaliação dos clientes' },
]

export const marqueeItems = [
  'Branding',
  'Web Design',
  'Performance',
  'Social Media',
  'Audiovisual',
  'Estratégia',
]

export interface Service {
  num: string
  title: string
  text: string
  tags: string[]
}

export const services: Service[] = [
  {
    num: '01',
    title: 'Branding & Identidade',
    text: 'Posicionamento, naming, identidade visual e manual de marca. Uma base sólida para tudo que vem depois.',
    tags: ['Posicionamento', 'Identidade visual', 'Brand book'],
  },
  {
    num: '02',
    title: 'Sites & Landing Pages',
    text: 'Sites rápidos, acessíveis e feitos para converter — do wireframe ao deploy, sem template genérico.',
    tags: ['UI/UX', 'Desenvolvimento', 'SEO técnico'],
  },
  {
    num: '03',
    title: 'Performance & Mídia',
    text: 'Campanhas em Meta e Google com verba tratada como investimento: teste, leitura de dados e escala.',
    tags: ['Meta Ads', 'Google Ads', 'CRO'],
  },
  {
    num: '04',
    title: 'Social Media',
    text: 'Linha editorial, direção de arte e ritmo de publicação que constroem audiência de verdade.',
    tags: ['Conteúdo', 'Direção de arte', 'Comunidade'],
  },
  {
    num: '05',
    title: 'Audiovisual',
    text: 'Roteiro, captação e edição de vídeos que seguram atenção nos primeiros três segundos.',
    tags: ['Roteiro', 'Captação', 'Motion'],
  },
  {
    num: '06',
    title: 'Consultoria',
    text: 'Diagnóstico do que já existe e um plano claro de prioridades para os próximos 90 dias.',
    tags: ['Diagnóstico', 'Roadmap', 'Mentoria'],
  },
]

export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

export const stats: Stat[] = [
  { value: 120, prefix: '+', label: 'projetos entregues de ponta a ponta' },
  { value: 8, label: 'anos de estrada construindo marcas' },
  { value: 3.4, suffix: 'x', decimals: 1, label: 'de retorno médio sobre mídia' },
  { value: 96, suffix: '%', label: 'dos clientes seguem com a gente' },
]

export interface Step {
  num: string
  title: string
  text: string
}

export const steps: Step[] = [
  {
    num: '01',
    title: 'Diagnóstico',
    text: 'Entendemos o negócio, o público e o que já foi tentado. Sem diagnóstico, qualquer criação é chute.',
  },
  {
    num: '02',
    title: 'Estratégia',
    text: 'Definimos posicionamento, mensagem e canais. Você aprova o caminho antes de qualquer peça ser criada.',
  },
  {
    num: '03',
    title: 'Execução',
    text: 'Design, conteúdo e desenvolvimento rodando em ciclos curtos, com entregas visíveis toda semana.',
  },
  {
    num: '04',
    title: 'Otimização',
    text: 'Medimos, cortamos o que não performa e dobramos no que funciona. Relatório claro, sem métrica de vaidade.',
  },
]

export interface CaseItem {
  title: string
  text: string
  tag: string
  variant: number
}

export const cases: CaseItem[] = [
  {
    title: 'Rebrand completo para rede de food service',
    text: 'Nova identidade, cardápio digital e campanha de reabertura em seis semanas.',
    tag: 'Branding',
    variant: 0,
  },
  {
    title: 'Site institucional de alta conversão',
    text: 'Estrutura nova de páginas e SEO técnico: 2,7x mais contatos qualificados.',
    tag: 'Web',
    variant: 1,
  },
  {
    title: 'Escala de mídia para e-commerce',
    text: 'Reestruturação de campanhas e criativos com ROAS saindo de 1,8 para 4,1.',
    tag: 'Performance',
    variant: 2,
  },
  {
    title: 'Conteúdo e audiovisual para clínica',
    text: 'Linha editorial e produção mensal de vídeos, com agenda cheia em quatro meses.',
    tag: 'Social',
    variant: 3,
  },
]

export interface Testimonial {
  text: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    text: 'Foi a primeira vez que uma agência sentou com a gente para entender o negócio antes de falar de arte. A diferença apareceu no caixa.',
    name: 'Marina Prado',
    role: 'Sócia, Grupo Vertice',
  },
  {
    text: 'Entregaram o site em prazo, sem enrolação, e continuaram acompanhando os números depois do lançamento.',
    name: 'Rafael Nunes',
    role: 'Diretor de Marketing, Nova Casa',
  },
  {
    text: 'O time é direto: mostra o que está funcionando e o que não está. Isso vale mais do que qualquer relatório bonito.',
    name: 'Camila Ferraz',
    role: 'CEO, Estúdio Lumo',
  },
]
