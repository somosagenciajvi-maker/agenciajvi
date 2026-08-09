/* ================================================================
   CONTEÚDO
   Todo o texto da página em um arquivo só. Para trocar uma frase,
   mexa aqui — nenhum componente precisa ser aberto.
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
  whatsapp: wa('Olá, quero vender mais com a Agência JVI'),
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
      'O anúncio está bom, o clique acontece — e a pessoa cai num perfil sem link, num site institucional de 2015 ou num WhatsApp sem contexto. O dinheiro foi gasto antes da conversa começar.',
    texto:
      'Uma landing page existe para uma coisa só: conduzir quem chegou até a próxima ação. Uma oferta, um argumento, um caminho. Sem menu de sete opções para a pessoa se perder no meio.',
    entra: [
      'Diagnóstico da oferta e do público antes da primeira linha de código',
      'Copy e arquitetura de argumento: o que vem primeiro, o que vem depois e por quê',
      'Direção de arte exclusiva, desenhada para a sua marca — nada de tema comprado',
      'Desenvolvimento próprio: carrega rápido e funciona no celular real, não no print',
      'Rastreamento desde o primeiro dia — Pixel da Meta, GA4 e evento de conversão',
      'Integração com WhatsApp, formulário e a ferramenta que você já usa',
      'Rodadas de ajuste em cima do que você apontar, até a página ficar de pé',
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
      'Mídia paga é a única frente que coloca a sua marca na frente de quem ainda não te conhece — hoje, no volume que você decidir. A conta é gerida com dados: o que traz conversa recebe mais verba, o que queima orçamento é cortado.',
    entra: [
      'Estruturação da conta e das campanhas no Meta Ads e no Google Ads',
      'Pesquisa de público e separação entre quem já te conhece e quem nunca ouviu falar',
      'Criativos com roteiro, edição e variações para teste — sem variação não existe otimização',
      'Gestão contínua: leitura dos números e ajuste de rota durante o mês, não só no fim',
      'Rastreamento e atribuição configurados para você saber de onde veio cada lead',
      'Relatório com leitura: o que aconteceu, por que aconteceu e o que muda no próximo ciclo',
    ],
    recebe: [
      'Conta de anúncios estruturada e no seu nome',
      'Campanhas no ar, separadas por objetivo e por público',
      'Leads chegando com origem identificada',
      'Relatório que você entende sem precisar de tradutor',
    ],
    cta: 'Quero anunciar com estratégia',
    wa: wa('Olá, quero gestão de tráfego pago com a Agência JVI'),
  },
  {
    id: 'social-media',
    index: '03',
    nome: 'Social Media',
    papel: 'Autoridade',
    titulo: 'Presença que\nconstrói autoridade\ntodo dia.',
    problema:
      'Postar por postar não constrói marca. Sem narrativa e sem ritmo, o perfil vira mural de avisos — e quem chega pelo anúncio não encontra motivo para confiar.',
    texto:
      'O social media sustenta as outras duas frentes. É onde a pessoa confere se a marca é real antes de comprar, e onde a sua marca deixa de ser mais uma opção para virar a escolha óbvia dentro da categoria.',
    entra: [
      'Linha editorial: o que a marca fala, com quem fala e o que ela nunca fala',
      'Direção de arte aplicada — feed que se reconhece antes de ler o @',
      'Roteiro e direção de gravação: você grava, a gente conduz. E edita.',
      'Grade de publicação com ritmo definido e combinado com você',
      'Copy com intenção comercial, não legenda de enfeite',
      'Leitura de desempenho e aposentadoria do que não engaja',
    ],
    recebe: [
      'Calendário de conteúdo aprovado antes de ir ao ar',
      'Peças entregues prontas para publicar',
      'Perfil organizado: bio, destaques e link de conversão',
      'Relatório com o que repetir e o que aposentar',
    ],
    cta: 'Quero minha marca no ar',
    wa: wa('Olá, quero social media com a Agência JVI'),
  },
]

export const SISTEMA = [
  {
    n: '01',
    nome: 'Social Media',
    papel: 'Autoridade',
    texto: 'Constrói a confiança que o anúncio sozinho não compra.',
  },
  {
    n: '02',
    nome: 'Tráfego Pago',
    papel: 'Demanda',
    texto: 'Leva a marca para fora da bolha de quem já te conhece.',
  },
  {
    n: '03',
    nome: 'Landing Page',
    papel: 'Conversão',
    texto: 'Transforma atenção em conversa e conversa em venda.',
  },
]

export const METODO = [
  {
    n: '01',
    titulo: 'Diagnóstico',
    texto:
      'Antes de qualquer criativo: como você vende hoje, quem compra, quanto vale um cliente e onde o funil vaza. É uma conversa, não um formulário.',
  },
  {
    n: '02',
    titulo: 'Estratégia',
    texto:
      'Posicionamento, oferta, canais e o que será medido. Você aprova o plano antes de qualquer coisa ir ao ar.',
  },
  {
    n: '03',
    titulo: 'Execução',
    texto:
      'Página, campanha e conteúdo entram no ar com o rastreamento configurado desde o primeiro dia.',
  },
  {
    n: '04',
    titulo: 'Otimização',
    texto:
      'Leitura constante. O que funciona vira processo, o que queima orçamento é cortado. É aqui que resultado deixa de ser sorte.',
  },
]

export const PRINCIPIOS = [
  'Não prometemos número mágico. Prometemos leitura honesta e ajuste rápido.',
  'Não escondemos o mês que não veio. Você vê o número bom e o ruim.',
  'Não entregamos relatório que ninguém entende.',
  'Não seguramos os seus acessos: conta, domínio e arquivos são seus.',
  'Sem enrolação e sem contrato surpresa.',
]

export const PILARES = [
  {
    n: '01',
    titulo: 'Estratégia',
    texto:
      'Diagnóstico do seu mercado, do seu público e do seu funil antes de qualquer criativo entrar no ar.',
  },
  {
    n: '02',
    titulo: 'Posicionamento',
    texto:
      'Sua marca deixa de ser mais uma opção e passa a ser a escolha óbvia dentro da categoria.',
  },
  {
    n: '03',
    titulo: 'Conteúdo',
    texto: 'Narrativa, direção de arte e ritmo de publicação que constroem autoridade todos os dias.',
  },
  {
    n: '04',
    titulo: 'Tráfego',
    texto: 'Mídia paga gerida com dados: verba onde converte, corte onde queima orçamento.',
  },
  {
    n: '05',
    titulo: 'Conversão',
    texto:
      'Páginas, copy e jornada desenhadas para transformar clique em conversa e conversa em venda.',
  },
  {
    n: '06',
    titulo: 'Escalabilidade',
    texto:
      'Processo previsível: o que funciona vira sistema, e o sistema cresce sem depender de sorte.',
  },
]

export const FAQ = [
  {
    p: 'Preciso contratar as três frentes?',
    r: 'Não. Cada uma resolve um problema diferente e funciona sozinha. O que é honesto dizer é que, juntas, elas se alimentam — e no diagnóstico a gente aponta por onde começa no seu caso, mesmo que seja por uma só.',
  },
  {
    p: 'Em quanto tempo eu vejo resultado?',
    r: 'Depende da frente. Tráfego pago dá sinal nos primeiros dias — sinal, não venda garantida. Landing page muda a taxa de conversão assim que entra no ar. Social media é construção: aparece na constância, não na primeira semana. Quem promete data exata está chutando.',
  },
  {
    p: 'Vocês atendem fora de Recife?',
    r: 'Sim. A base é Recife, o trabalho é remoto e a JVI atende marcas em todo o Brasil. Reunião por chamada, entrega por link, resposta no WhatsApp.',
  },
  {
    p: 'Como começa?',
    r: 'Por uma conversa. Você conta como vende hoje, a gente aponta o caminho mais curto entre a sua marca e o próximo cliente e envia a proposta com escopo e valor. A conversa não custa nada e não vira compromisso.',
  },
]
