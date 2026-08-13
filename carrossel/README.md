# Carrossel Instagram — Agência JVI

Carrossel institucional de 8 slides em 1080 × 1350 px (4:5), montado com a mesma
identidade visual da landing page: preto `#050505`, azul `#0a5cff`, Anton para
títulos, Oswald para labels e Inter para textos.

## Estrutura

```
carrossel/
├── index.html      # os 8 slides (fonte da verdade — edite aqui)
├── render.mjs      # exporta cada slide em PNG
├── legenda.md      # legenda, hashtags e roteiro para publicação
├── assets/
│   └── logo-jvi.jpg
└── out/            # PNGs prontos para publicar
```

## Como regerar os PNGs

```bash
node carrossel/render.mjs
```

O script sobe um servidor estático na raiz do projeto (para as fontes em
`public/fonts` carregarem), abre `carrossel/index.html` no Chromium via
Playwright e captura cada `.slide` em `carrossel/out/`.

Requer o pacote `playwright` resolvível a partir da raiz do projeto. Se ele não
estiver instalado:

```bash
npm i -D playwright
```

## Como editar

Abra `carrossel/index.html` direto no navegador para ver o deck completo — os
slides são renderizados na sequência, um abaixo do outro. Ajuste o texto ou o
CSS e rode o `render.mjs` de novo.

Para trocar o número de slides, basta adicionar ou remover uma `<section class="slide">`;
o script exporta quantas existirem. Lembre de atualizar os contadores `NN / 08`
no rodapé de cada slide.
