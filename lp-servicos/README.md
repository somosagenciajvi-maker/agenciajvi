# Agência JVI — LP de Serviços

Landing page de apresentação das três frentes de serviço: **criação de landing
page**, **tráfego pago** e **social media**.

Projeto independente do site principal (que fica na raiz do repositório): tem
o próprio `package.json`, o próprio build e pode ser publicado sozinho, em
domínio ou subdomínio separado.

## Rodar

```bash
cd lp-servicos
npm install
npm run dev        # http://localhost:5174
```

## Publicar

```bash
npm run build      # gera lp-servicos/dist
npm run preview    # confere o build de produção antes de subir
```

O conteúdo de `dist/` é estático: sobe em qualquer hospedagem (Vercel,
Netlify, Cloudflare Pages, Hostinger, S3). Não precisa de servidor Node.

## Onde mexer

| O que | Arquivo |
| --- | --- |
| **Todo o texto da página** | `src/content.ts` |
| Ordem e montagem das seções | `src/App.tsx` |
| Cores, tipografia, espaçamento | `src/styles/global.css` (bloco `:root`) |
| Peças ilustrativas dos serviços | `src/components/visuals.tsx` |
| Título, descrição e dados de SEO | `index.html` |

Trocar uma frase, um item de escopo ou um contato é mexer só em
`src/content.ts` — nenhum componente precisa ser aberto.

## Ativos de marca

Fontes, artes e favicon são lidos de `../public`, a mesma pasta do site
principal (`publicDir` em `vite.config.ts`). Uma fonte de verdade só para os
ativos, sem duplicar 9 MB de PNG no repositório.

As versões leves usadas na página estão em `../public/art/opt/*.webp`
(720 px para os quadros do feed, 1600 px para a faixa da equipe). Os PNGs
originais continuam intactos como arquivo-fonte.

## Decisões que valem manter

- **Sem números de resultado inventados.** A página constrói credibilidade
  por método, escopo e entregáveis. Quando houver case ou depoimento real,
  o lugar natural é entre `Princípios` e `Por que a JVI`.
- **Sem preço na página.** Todo CTA leva para o WhatsApp, com mensagem
  específica por serviço (`src/content.ts`).
- **Sem foto de banco de imagem.** O que ilustra cada frente é um artefato
  desenhado em HTML/SVG ou a própria arte da JVI.
