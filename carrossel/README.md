# Carrosséis de Instagram — Agência JVI

Posts em 1080 × 1350 px (4:5), montados com a mesma identidade visual da landing
page: preto `#050505`, azul `#0a5cff`, Anton para títulos, Oswald para labels e
Inter para textos, com o grão e a vinheta do site.

## Posts

| Deck | Post | Slides |
|------|------|--------|
| `institucional` | Apresentação da agência — quem somos, serviços, método, resultados | 8 |
| `erros` | 5 erros que fazem seu negócio perder vendas todo dia | 8 |

Legenda, hashtags e roteiro de cada post ficam em `legendas/<deck>.md`.

## Estrutura

```
carrossel/
├── base.css            # tokens, slide base, tipografia e componentes comuns
├── institucional.html  # deck institucional
├── erros.html          # deck educativo (+ componentes só dele)
├── render.mjs          # exporta os slides em PNG
├── legendas/           # legenda e hashtags por post
├── assets/
└── out/<deck>/         # PNGs prontos para publicar
```

## Como gerar os PNGs

```bash
node carrossel/render.mjs           # todos os decks
node carrossel/render.mjs erros     # apenas um deck
```

O script sobe um servidor estático na raiz do projeto (para as fontes em
`public/fonts` carregarem), abre cada deck no Chromium via Playwright e captura
cada `.slide` em `out/<deck>/`. A pasta de saída é recriada a cada execução, para
não sobrar PNG órfão de uma versão com mais slides.

Como os slides têm altura fixa com `overflow:hidden`, o script também confere se
o conteúdo cabe nos 1350px e falha com código 1 se algum estourar — caso
contrário o excesso seria cortado em silêncio.

Requer o pacote `playwright` resolvível a partir da raiz do projeto:

```bash
npm i -D playwright
```

## Como criar um post novo

1. Copie um dos `.html` existentes e renomeie — o nome do arquivo vira o nome do deck.
2. Mantenha o `<link rel="stylesheet" href="base.css" />`; componentes exclusivos
   do post vão num `<style>` do próprio arquivo.
3. Cada `<section class="slide">` é um slide. Atualize os contadores `NN / 08` do rodapé.
4. Rode `node carrossel/render.mjs <nome>` e escreva a legenda em `legendas/<nome>.md`.

Para conferir o deck inteiro no navegador, abra o `.html` direto — os slides
aparecem na sequência, um abaixo do outro.
