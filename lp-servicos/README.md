# Agência JVI — LP de Serviços

Landing page de apresentação das três frentes de serviço: **criação de landing
page**, **tráfego pago** e **social mídia**.

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

## Arquivo único, para enviar

```bash
npm run arquivo-unico   # gera dist-unico/agenciajvi-servicos.html
```

Um `.html` só, com CSS, JavaScript, fontes e artes embutidos (~1,7 MB).
Abre com dois cliques, offline, sem servidor — serve para mandar por
WhatsApp, anexar numa proposta ou guardar como registro de uma versão.
Não é o formato de publicação: para o site no ar, use `dist/`.

Ele sai de uma build própria (`--mode unico`), em **script clássico e
não módulo ES**. Isso não é detalhe: módulo aberto por `file://` é
bloqueado pela política de origem na maioria dos navegadores de celular
— o CSS carrega, o fundo preto aparece e o React nunca monta. Quem
receber o arquivo veria uma tela preta. Script clássico não tem essa
restrição.

O arquivo também carrega uma rede de segurança: se o app não montar em
2,5 s por qualquer motivo, aparecem os contatos da JVI em vez de uma
tela sem explicação.

Como ele agora nasce em `dist-unico/`, **não** vai mais junto ao
publicar `dist/` — o cuidado que estava documentado em `public/_headers`
deixou de ser necessário.

> **Apague-o antes de publicar.** Ele é gravado dentro de `dist/`, então
> sobe junto se você mandar a pasta inteira para a hospedagem — e lá ele
> abre em branco, porque a CSP de `public/_headers` bloqueia `<script>` e
> fontes embutidas (o motivo está comentado no próprio arquivo).
>
> ```bash
> rm lp-servicos/dist/agenciajvi-servicos.html
> ```

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

- **A página é só os serviços.** Abertura, três blocos e contato. Método,
  diferenciais, equipe e FAQ foram removidos em favor do foco — estão no
  histórico do git (commit `ff9b3e9`) se um dia fizerem falta.
- **Sem números de resultado inventados.** A credibilidade vem do escopo e
  dos entregáveis declarados. Quando houver case ou depoimento real, o
  lugar natural é logo antes do contato.
- **O bloco do meio vai sobre papel.** O corte claro no miolo é o que dá
  respiro e marca a virada de capítulo. Trocar é mudar `claro={i === 1}`
  em `App.tsx`.
- **Sem preço na página.** Todo CTA leva para o WhatsApp, com mensagem
  específica por serviço (`src/content.ts`).
- **Sem foto de banco de imagem.** O que ilustra cada frente é um artefato
  desenhado em HTML/SVG ou a própria arte da JVI.
