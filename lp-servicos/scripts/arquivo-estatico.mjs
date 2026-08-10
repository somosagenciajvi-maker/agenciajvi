/* ================================================================
   Gera a versão ESTÁTICA do arquivo único.

   Por que existir: o .html de envio é aberto por file://, dentro do
   gerenciador de arquivos ou do visualizador do WhatsApp, em aparelho
   que a gente não escolhe. Qualquer coisa que faça o JavaScript falhar
   ali — módulo bloqueado por origem, método que o navegador não tem,
   visualizador que não executa script — entrega uma tela preta para o
   cliente, porque o desenho inteiro depende do React montar.

   A solução não é caçar uma incompatibilidade de cada vez: é não
   depender de script nenhum. Este arquivo abre a página já empacotada
   num navegador, espera tudo assentar, e grava o HTML resultante — com
   o desenho final, os estilos embutidos e os links funcionando. Sem
   <script>, não há o que falhar.

   Custo assumido: sem animação e sem hover. É o preço de um arquivo
   que abre em qualquer lugar. Para ver a página com movimento existe o
   site publicado.

   Uso:  npm run arquivo-unico && npm run arquivo-estatico
   Saída: lp-servicos/dist-unico/agenciajvi-servicos-estatico.html
================================================================ */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const PROJETO = join(AQUI, '..')
const ENTRADA = join(PROJETO, 'dist-unico', 'agenciajvi-servicos.html')
const SAIDA = join(PROJETO, 'dist-unico', 'agenciajvi-servicos-estatico.html')

readFileSync(ENTRADA) // falha cedo e com clareza se a build não foi feita

const navegador = await chromium.launch()
/* movimento reduzido: cada elemento nasce no estado final em vez de
   esperar uma animação que, no arquivo estático, nunca vai rodar */
const ctx = await navegador.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
const pagina = await ctx.newPage()
await pagina.goto('file://' + ENTRADA, { waitUntil: 'load' })
await pagina.waitForTimeout(3000)

/* percorre a página inteira: o que só aparece ao entrar em tela
   precisa ter entrado antes de congelarmos o resultado */
await pagina.evaluate(
  () =>
    new Promise((pronto) => {
      let y = 0
      const t = setInterval(() => {
        window.scrollTo(0, y)
        y += 400
        if (y > document.body.scrollHeight) {
          clearInterval(t)
          window.scrollTo(0, 0)
          setTimeout(pronto, 1800)
        }
      }, 90)
    }),
)

const html = await pagina.evaluate(() => {
  /* fora tudo que só faz sentido com script vivo */
  document.querySelectorAll('script').forEach((n) => n.remove())
  document.getElementById('saida-emergencia')?.remove()
  document.querySelectorAll('noscript').forEach((n) => n.remove())

  /* o menu fixo esconde-se ao rolar via JS; aqui ele fica sempre visível */
  document.querySelector('.nav')?.classList.remove('is-hidden', 'is-solid')

  /* a barra de progresso mede rolagem com script: sem ele, mentiria */
  document.querySelector('.progress')?.remove()

  /* devolve tudo ao topo para o arquivo abrir no começo da página */
  window.scrollTo(0, 0)

  return '<!doctype html>\n' + document.documentElement.outerHTML
})

await navegador.close()

/* Conferência: um arquivo estático com <script> dentro não é estático,
   e um arquivo que perdeu o conteúdo não serve para nada. */
const erros = []
if (/<script/i.test(html)) erros.push('sobrou <script> no arquivo estático')
if (!/PEDIR OR|Pedir or/i.test(html)) erros.push('o CTA principal não está no HTML')
if (!/wa\.me/.test(html)) erros.push('os links de WhatsApp sumiram')
if (html.length < 500_000) erros.push(`arquivo pequeno demais (${html.length} bytes)`)
if (erros.length) {
  console.error('ABORTADO:\n- ' + erros.join('\n- '))
  process.exit(1)
}

writeFileSync(SAIDA, html)
console.log(`${SAIDA} — ${(html.length / 1024 / 1024).toFixed(2)} MB, sem script`)
