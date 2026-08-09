/* ================================================================
   Empacota a build da LP num único .html.
   CSS, JavaScript, fontes e artes viram parte do arquivo: ele abre
   com dois cliques, offline, sem servidor — bom para enviar por
   WhatsApp, anexar em proposta ou guardar como registro da versão.

   Uso:  npm run build && npm run arquivo-unico
   Saída: lp-servicos/dist/agenciajvi-servicos.html
================================================================ */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const AQUI = dirname(fileURLToPath(import.meta.url))
const PROJETO = join(AQUI, '..')
const DIST = join(PROJETO, 'dist')
const PUBLICO = join(PROJETO, '..', 'public')
const SAIDA = join(DIST, 'agenciajvi-servicos.html')

const assets = readdirSync(join(DIST, 'assets'))
const nomeJs = assets.find((f) => f.endsWith('.js'))
const nomeCss = assets.find((f) => f.endsWith('.css'))
if (!nomeJs || !nomeCss) {
  console.error('dist/assets vazio — rode `npm run build` antes.')
  process.exit(1)
}

let js = readFileSync(join(DIST, 'assets', nomeJs), 'utf8')
const css = readFileSync(join(DIST, 'assets', nomeCss), 'utf8')

/* artes -> data URI */
for (const f of readdirSync(join(PUBLICO, 'art', 'opt'))) {
  const b64 = readFileSync(join(PUBLICO, 'art', 'opt', f)).toString('base64')
  js = js.split(`/art/opt/${f}`).join(`data:image/webp;base64,${b64}`)
}

/* fontes -> data URI. Só os subsets latinos: cobrem todos os acentos do
   português e cortam o arquivo pela metade. */
const fontes = readFileSync(join(PUBLICO, 'fonts', 'fonts.css'), 'utf8')
  .split('@font-face')
  .filter(Boolean)
  .reduce((acc, bloco) => {
    const m = bloco.match(/url\(\/fonts\/([a-z0-9-]+\.woff2)\)/)
    if (!m || m[1].includes('latin-ext')) return acc
    const b64 = readFileSync(join(PUBLICO, 'fonts', m[1])).toString('base64')
    return (
      acc +
      '@font-face' +
      bloco
        .replace(/url\(\/fonts\/[a-z0-9-]+\.woff2\)/, `url(data:font/woff2;base64,${b64})`)
        .replace(/unicode-range:[^;]+;/, '')
    )
  }, '')

/* Fora do ASCII vira \uXXXX: assim o texto sai certo mesmo se o arquivo
   for aberto por um servidor que não declare charset utf-8. */
js = js.replace(/[^\x00-\x7f]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))

/* Favicon com a marca vetorial, em base64 — cru dentro de href="" as
   aspas do SVG encerrariam o atributo no meio. */
const faviconSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 36 138 120">' +
  '<rect x="6" y="96" width="38" height="54" fill="#0A5CFF"/>' +
  '<rect x="50" y="70" width="38" height="80" fill="#0A5CFF"/>' +
  '<rect x="94" y="42" width="38" height="108" fill="#0A5CFF"/>' +
  '<g fill="#fff" font-family="Impact,sans-serif" font-size="26" text-anchor="middle">' +
  '<text x="25" y="132">J</text><text x="69" y="119">V</text><text x="113" y="105">I</text>' +
  '</g></svg>'
const favicon = Buffer.from(faviconSvg, 'utf8').toString('base64')

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#070709">
<title>Agência JVI — Landing Page, Tráfego Pago e Social Media</title>
<meta name="description" content="As três frentes que tiram a sua marca da dependência do boca a boca: landing pages que convertem, tráfego pago gerido com dados e social media que constrói autoridade. Agência JVI, Recife/PE.">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Agência JVI">
<meta property="og:title" content="Agência JVI — Landing Page, Tráfego Pago e Social Media">
<meta property="og:description" content="Três frentes, um sistema de vendas. Do boca a boca ao digital.">
<link rel="icon" href="data:image/svg+xml;base64,${favicon}">
<style>${fontes}</style>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<noscript>
  <div style="padding:48px 24px;font-family:system-ui,sans-serif;color:#fff;background:#070709">
    <h1 style="font-size:28px;margin:0 0 12px">Agência JVI</h1>
    <p style="color:rgba(255,255,255,.7);margin:0 0 24px">
      Esta página precisa de JavaScript para exibir o conteúdo completo.
      Enquanto isso, fale com a gente:
    </p>
    <p style="line-height:2;margin:0">
      Telefone e WhatsApp: <a style="color:#0a5cff" href="tel:+5581995757305">+55 81 99575-7305</a><br>
      Instagram: <a style="color:#0a5cff" href="https://instagram.com/agencia.jvi">@agencia.jvi</a><br>
      E-mail: <a style="color:#0a5cff" href="mailto:somosagenciajvi@gmail.com">somosagenciajvi@gmail.com</a>
    </p>
  </div>
</noscript>
<script type="module">${js}</script>
</body>
</html>
`

writeFileSync(SAIDA, html)
console.log(`${SAIDA} — ${(html.length / 1024 / 1024).toFixed(2)} MB`)
