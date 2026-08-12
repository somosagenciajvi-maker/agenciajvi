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
const DIST = join(PROJETO, 'dist-unico')
const PUBLICO = join(PROJETO, '..', 'public')
const SAIDA = join(PROJETO, 'dist-unico', 'agenciajvi-servicos.html')

/* ----------------------------------------------------------------
   Fronteira de contexto: o que entra numa tag não pode fechá-la.

   Tudo aqui é interpolado dentro de <script> e <style>. O parser de
   HTML não sabe que aquilo é JavaScript ou CSS: para ele, o elemento
   termina na primeira sequência de fechamento que aparecer no texto.
   Um "</style>" dentro de uma string de CSS encerra o <style> ali, e
   o que vem depois vira markup — inclusive um <img onerror> que
   executa. O arquivo final vai por WhatsApp e em anexo de proposta,
   então ele tem que ser inerte por construção, não por sorte.

   O bundle do Vite hoje já sai escapado pelo esbuild, mas isso é
   propriedade do minificador, não deste script: fonts.css é lido cru
   do disco e nunca passa por ele. Escapamos aqui de qualquer forma —
   é a única camada que continua valendo se a build mudar.
---------------------------------------------------------------- */

/* Em JavaScript, "\/" é apenas "/" e "\!" é apenas "!": o código roda
   igual. O que muda é que o parser de HTML deixa de enxergar as
   sequências. "<!--" importa porque coloca o parser em modo escapado,
   onde o </script> legítimo do fim do arquivo para de fechar a tag. */
const escaparScript = (s) =>
  s.replace(/<\/(script)/gi, '<\\/$1').replace(/<!--/g, '<\\!--')

/* Em CSS, "\3c " é o escape hexadecimal de "<" — mesma técnica que o
   próprio Vite aplica ao minificar. O espaço encerra o escape e é
   consumido, então o valor final continua idêntico. */
const escaparStyle = (s) => s.replace(/<\/(style)/gi, '\\3c /$1')

const assets = readdirSync(join(DIST, 'assets'))
const jsEncontrados = assets.filter((f) => f.endsWith('.js'))
const cssEncontrados = assets.filter((f) => f.endsWith('.css'))
if (!jsEncontrados.length || !cssEncontrados.length) {
  console.error('dist-unico/assets vazio — rode `npm run build:unico` antes.')
  process.exit(1)
}
/* Mais de um bundle significa sobra de build anterior ou code-splitting
   novo. Escolher um em silêncio entregaria ao cliente um arquivo com
   metade da página; melhor parar e avisar. */
if (jsEncontrados.length > 1 || cssEncontrados.length > 1) {
  console.error(
    `dist/assets tem mais de um bundle (js: ${jsEncontrados.join(', ')} | css: ${cssEncontrados.join(', ')}).\n` +
      'Apague dist-unico/ e rode `npm run build:unico` de novo.',
  )
  process.exit(1)
}
const [nomeJs] = jsEncontrados
const [nomeCss] = cssEncontrados

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

/* Aviso com os contatos. Serve a dois casos: JavaScript desligado
   (via <noscript>) e app que não montou por qualquer outro motivo
   (via a rede de segurança lá embaixo). Nos dois, a pessoa vê como
   falar com a JVI em vez de uma tela preta sem explicação. */
const aviso = `
  <div style="padding:48px 24px;font-family:system-ui,sans-serif;color:#fff;background:#070709">
    <h1 style="font-size:28px;margin:0 0 12px">Agência JVI</h1>
    <p style="color:rgba(255,255,255,.7);margin:0 0 24px;line-height:1.6">
      Não foi possível exibir a página completa neste aparelho.
      Fale com a gente:
    </p>
    <p style="line-height:2;margin:0">
      Telefone e WhatsApp: <a style="color:#0a5cff" href="tel:+5581995757305">+55 81 99575-7305</a><br>
      Instagram: <a style="color:#0a5cff" href="https://instagram.com/agencia.jvi">@agencia.jvi</a><br>
      E-mail: <a style="color:#0a5cff" href="mailto:somosagenciajvi@gmail.com">somosagenciajvi@gmail.com</a>
    </p>
  </div>`

const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#070709">
<title>Agência JVI — Landing Page, Tráfego Pago e Social Mídia</title>
<meta name="description" content="As três frentes que tiram a sua marca da dependência do boca a boca: landing pages que convertem, tráfego pago gerido com dados e social mídia que constrói autoridade. Agência JVI, Recife/PE.">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Agência JVI">
<meta property="og:title" content="Agência JVI — Landing Page, Tráfego Pago e Social Mídia">
<meta property="og:description" content="Três frentes, um sistema de vendas. Do boca a boca ao digital.">
<link rel="icon" href="data:image/svg+xml;base64,${favicon}">
<style>${escaparStyle(fontes)}</style>
<style>${escaparStyle(css)}</style>
</head>
<body>
<div id="root"></div>
<div id="saida-emergencia" hidden>${aviso}</div>
<noscript>${aviso}</noscript>
<script>
  /* Object.hasOwn é de 2022 e o bundle usa. Sem isto, aparelho mais
     antigo derruba o React e a página fica preta. */
  Object.hasOwn ||
    (Object.hasOwn = function (o, k) {
      return Object.prototype.hasOwnProperty.call(o, k)
    })
</script>
<script>${escaparScript(js)}</script>
<!-- Rede de segurança: se por qualquer motivo o app não montar (script
     bloqueado pelo visualizador, navegador antigo), a pessoa vê os
     contatos em vez de uma tela preta sem explicação. -->
<script>
  setTimeout(function () {
    var raiz = document.getElementById('root')
    var saida = document.getElementById('saida-emergencia')
    if (raiz && !raiz.firstChild && saida) saida.hidden = false
  }, 2500)
</script>
</body>
</html>
`

/* ----------------------------------------------------------------
   Conferência antes de gravar. O escape acima é a defesa; isto é a
   prova de que ela pegou tudo. Se sobrar uma sequência de fechamento
   a mais do que as tags que realmente abrimos, alguma coisa escapou
   do filtro e o arquivo não pode sair — um .html adulterado que ainda
   renderiza bonito é pior do que nenhum arquivo.
---------------------------------------------------------------- */
const conta = (agulha) => html.split(agulha).length - 1
/* três tags <script>: o polyfill, o app e a rede de segurança que
   revela os contatos se o app não montar. Se este número divergir do markup,
   a build para — é essa conferência que impede um arquivo adulterado
   de sair parecendo normal. */
const ESPERADO = { '</script': 3, '</style': 2 }
for (const [seq, esperado] of Object.entries(ESPERADO)) {
  const achado = conta(seq)
  if (achado !== esperado) {
    console.error(
      `ABORTADO: "${seq}" aparece ${achado}x no HTML, esperado ${esperado}x.\n` +
        'Conteúdo embutido está fechando a tag antes da hora — o arquivo seria vulnerável a injeção.',
    )
    process.exit(1)
  }
}

writeFileSync(SAIDA, html)
console.log(`${SAIDA} — ${(html.length / 1024 / 1024).toFixed(2)} MB`)
