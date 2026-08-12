/* ================================================================
   CONTEÚDO
   Todo o texto da página em um arquivo só. Para trocar uma frase,
   mexa aqui — nenhum componente precisa ser aberto.

   A página apresenta três serviços e nada mais. Cada bloco segue a
   mesma partitura: o problema, a resposta, o que entra, o que você
   recebe, o convite. Quem lê compara as três frentes sem esforço.
================================================================ */

const WA_NUMERO = '5581995757305'

export const wa = (mensagem: string) =>
  `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(mensagem)}`

export const CONTATO = {
  telefone: '+55 81 99575-7305',
  telefoneHref: 'tel:+5581995757305',
  instagram: '@agencia.jvi',
  instagramHref: 'https://instagram.com/agencia.jvi',
  email: 'somosagenciajvi@gmail.com',
  emailHref: 'mailto:somosagenciajvi@gmail.com',
  praca: 'Recife · PE · Brasil',
  whatsapp: wa('Olá! Vim pela página de serviços da JVI e quero pedir um orçamento.'),
}

/* A única coisa que a página precisa que aconteça é a conversa abrir.
   Então o que tira o medo de abrir fica escrito debaixo de cada botão
   — e é a descrição do mecanismo, não promessa: o wa.me realmente
   abre o WhatsApp com o texto já digitado. */
export const SEM_ATRITO = 'Abre o WhatsApp com a mensagem já escrita. Você só aperta enviar.'

export const ABERTURA = {
  eyebrow: 'Agência JVI — Recife, PE',
  /* quem não se reconhece na primeira frase vai embora; quem se
     reconhece lê o resto. A frase sai dos três problemas lá de baixo. */
  lead:
    'Para quem já vende no boca a boca e trava na hora de anunciar. A página que recebe o clique, a verba que traz gente nova, o perfil que sustenta a confiança — cada uma funciona sozinha.',
  ctaPrimario: 'Pedir orçamento no WhatsApp',
  ctaSecundario: 'Ver as três frentes',
  navCta: 'Pedir orçamento',
}

/* O fechamento não lista canais: ele conta o que acontece depois do
   clique. Os três passos são a frase que já estava no painel de
   orçamento, aberta em etapas — o "e depois?" é o que segura o dedo. */
export const FECHAMENTO = {
  titulo: 'Comece por uma frente.\nOu pelas três.',
  chamada: 'Como começa',
  passos: [
    {
      n: '01',
      t: 'Você abre a conversa',
      d: 'A mensagem já vai escrita. Nenhum formulário, nenhum cadastro.',
    },
    {
      n: '02',
      t: 'A gente pergunta o essencial',
      d: 'O que você vende e para quem. Sem reunião obrigatória para isso.',
    },
    {
      n: '03',
      t: 'Você recebe por escrito',
      d: 'Escopo, prazo e valor no mesmo dia útil. Aí você decide.',
    },
  ],
  cta: 'Pedir orçamento no WhatsApp',
  canaisTitulo: 'Prefere outro canal?',
}

export type Servico = {
  id: string
  index: string
  nome: string
  papel: string
  titulo: string
  problema: string
  texto: string
  entra: string[]
  recebe: string[]
  cta: string
  wa: string
}

export const SERVICOS: Servico[] = [
  {
    id: 'landing-page',
    index: '01',
    nome: 'Landing Page',
    papel: 'Conversão',
    titulo: 'A página que\ntransforma clique\nem conversa.',
    problema:
      'O anúncio está bom, o clique acontece, e a pessoa cai num perfil sem link ou num site institucional de 2015. O dinheiro foi gasto antes da conversa começar.',
    texto:
      'Uma landing page conduz quem chegou até a próxima ação: uma oferta, um argumento, um caminho.',
    entra: [
      'Diagnóstico da oferta e do público antes da primeira linha de código',
      'Copy e arquitetura de argumento: o que vem primeiro, o que vem depois e por quê',
      'Direção de arte exclusiva. Nada de tema comprado e recolorido',
      'Desenvolvimento próprio: abre rápido no 4G e é testado no celular, não no print',
      'Rastreamento no ar desde o primeiro dia: Pixel da Meta, GA4 e evento de conversão',
    ],
    recebe: [
      'Página publicada no seu domínio',
      'Versão mobile tratada, não apenas encolhida',
      'Conversão medida e visível no gerenciador',
      'Acessos e arquivos no seu nome',
    ],
    cta: 'Quero uma landing page',
    wa: wa('Olá, quero uma landing page com a Agência JVI'),
  },
  {
    id: 'trafego-pago',
    index: '02',
    nome: 'Tráfego Pago',
    papel: 'Demanda',
    titulo: 'Verba onde converte.\nCorte onde queima.',
    problema:
      'Impulsionar publicação não é tráfego pago. Sem estrutura de campanha, público definido e criativo testado, o anúncio vira aluguel de alcance: parou de pagar, sumiu.',
    texto:
      'É a única frente que coloca a sua marca na frente de quem ainda não te conhece. Hoje, no volume que você decidir.',
    entra: [
      'Estruturação da conta e das campanhas no Meta Ads e no Google Ads',
      'Pesquisa de público: quem já te conhece e quem nunca ouviu falar',
      'Criativos com roteiro, edição e variações para teste',
      'Gestão contínua: ajuste de rota durante o mês, não só no fim',
      'Relatório com leitura: o que aconteceu e o que muda no ciclo seguinte',
    ],
    recebe: [
      'Conta de anúncios estruturada e no seu nome',
      'Campanhas separadas por objetivo e por público',
      'Leads chegando com origem identificada',
    ],
    cta: 'Quero anunciar com estrutura',
    wa: wa('Olá, quero gestão de tráfego pago com a Agência JVI'),
  },
  {
    id: 'social-media',
    index: '03',
    nome: 'Social Mídia',
    papel: 'Autoridade',
    titulo: 'Quem chega pelo\nanúncio olha o\nperfil primeiro.',
    problema:
      'Postar por postar não constrói marca. Sem narrativa e sem ritmo o perfil vira mural de avisos, e quem chega pelo anúncio não encontra motivo para confiar.',
    texto:
      'É onde a pessoa confere se a marca é real antes de comprar.',
    entra: [
      'Linha editorial: o que a marca fala, com quem fala e o que ela nunca fala',
      'Direção de arte aplicada: dá para reconhecer o feed antes de ler o @',
      'Roteiro e direção de gravação: você grava, a gente conduz. E edita.',
      'Grade de publicação com ritmo definido e combinado com você',
      'Leitura de desempenho e aposentadoria do que não engaja',
    ],
    recebe: [
      'Calendário aprovado antes de ir ao ar',
      'Peças entregues prontas para publicar',
      'Perfil organizado: bio, destaques e link',
    ],
    cta: 'Quero o perfil no ritmo',
    wa: wa('Olá, quero social mídia com a Agência JVI'),
  },
]
