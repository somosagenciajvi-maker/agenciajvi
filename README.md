# Projeto Novo — Agência JVI

Landing page da Agência JVI construída do zero em **React + Vite + TypeScript**, sem
dependências de UI ou de animação: só React e CSS.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5173
```

Outros comandos:

```bash
npm run build      # checagem de tipos + build de produção em dist/
npm run preview    # serve o build de produção
npm run typecheck  # só a checagem de tipos
```

## Estrutura

```
index.html              Documento base, metatags e fontes
public/favicon.svg      Favicon
src/
  main.tsx              Ponto de entrada
  App.tsx               Composição das seções da página
  data/content.ts       Todo o conteúdo editável (textos, serviços, cases…)
  components/           Uma seção por arquivo (Header, Hero, Services…)
  hooks/
    useInView.ts        Revelação de elementos ao entrar na viewport
    useScrolled.ts      Estado do header ao rolar a página
  styles/
    global.css          Tokens de design, reset e utilitários
    sections.css        Estilos de cada seção
```

## Como editar

- **Textos, serviços, cases e depoimentos:** `src/data/content.ts`. Os componentes
  apenas consomem esses dados, então nada de HTML precisa ser tocado.
- **Cores, tipografia e espaçamentos:** variáveis CSS no topo de
  `src/styles/global.css`.
- **Imagens dos cases:** hoje são artes geradas em SVG
  (`src/components/CasePoster.tsx`). Ao ter o material real, troque o componente
  por uma `<img>` dentro de `.case-card__media`.

## Formulário de contato

O formulário valida os campos no cliente e abre o aplicativo de e-mail do visitante
com a mensagem já preenchida (`mailto:`) — não há backend e nenhum dado é
armazenado. Para enviar por API, substitua o bloco `mailto:` em
`src/components/Contact.tsx` por um `fetch` para o seu endpoint.

## Acessibilidade e performance

- HTML semântico, link "pular para o conteúdo" e foco visível em toda navegação.
- Animações respeitam `prefers-reduced-motion`.
- Layout responsivo com `clamp()`, sem breakpoints rígidos de tipografia.

## Deploy

O build é estático (`dist/`) e funciona em qualquer host — Vercel, Netlify,
Cloudflare Pages ou GitHub Pages.

- Build command: `npm run build`
- Output directory: `dist`
