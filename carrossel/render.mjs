/**
 * Renderiza os slides de cada deck em PNG 1080x1350 (formato 4:5 do Instagram).
 *
 *   node carrossel/render.mjs              # todos os decks
 *   node carrossel/render.mjs erros        # apenas o deck indicado
 *
 * Cada arquivo .html desta pasta é um deck; a saída vai para out/<deck>/.
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { mkdir, readdir, readFile, rm } from 'node:fs/promises'
import { basename, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = fileURLToPath(new URL('.', import.meta.url))
const ROOT = normalize(join(HERE, '..'))
const OUT = join(HERE, 'out')
const PORT = 4173

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}

const server = createServer(async (req, res) => {
  const path = normalize(join(ROOT, decodeURIComponent(req.url.split('?')[0])))
  if (!path.startsWith(ROOT)) {
    res.writeHead(403).end()
    return
  }
  try {
    const data = await readFile(path)
    res.writeHead(200, { 'content-type': MIME[extname(path)] ?? 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404).end('not found')
  }
})

await new Promise((resolve) => server.listen(PORT, resolve))

const only = process.argv[2]
const decks = (await readdir(HERE))
  .filter((f) => f.endsWith('.html'))
  .map((f) => basename(f, '.html'))
  .filter((d) => !only || d === only)
  .sort()

if (decks.length === 0) {
  console.error(only ? `deck "${only}" não encontrado` : 'nenhum deck .html encontrado')
  server.close()
  process.exit(1)
}

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 1,
})

let overflowed = 0

for (const deck of decks) {
  const dir = join(OUT, deck)
  // Recria a pasta para não deixar PNGs órfãos de uma versão com mais slides.
  await rm(dir, { recursive: true, force: true })
  await mkdir(dir, { recursive: true })

  await page.goto(`http://127.0.0.1:${PORT}/carrossel/${deck}.html`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(600)

  const slides = await page.$$('.slide')
  console.log(`\n${deck} — ${slides.length} slides`)

  for (let i = 0; i < slides.length; i++) {
    const n = String(i + 1).padStart(2, '0')
    const file = join(dir, `jvi-${deck}-${n}.png`)

    // O slide tem altura fixa e overflow:hidden, então conteúdo em excesso seria
    // cortado sem aviso. Medimos até onde o conteúdo desce, ignorando as camadas
    // decorativas (orbes, vinheta, grão e numeral de fundo) que sangram de propósito.
    const overflow = await slides[i].evaluate((el) => {
      const top = el.getBoundingClientRect().top
      const limit = el.clientHeight - parseFloat(getComputedStyle(el).paddingBottom)
      let bottom = 0
      for (const child of el.children) {
        if (child.matches('.orb, .vig, .grain, .ghost')) continue
        bottom = Math.max(bottom, child.getBoundingClientRect().bottom - top)
      }
      return Math.round(bottom - limit)
    })
    if (overflow > 1) {
      overflowed++
      console.warn(`  ⚠ slide ${n}: conteúdo estoura ${overflow}px além dos 1350px`)
    }

    await slides[i].screenshot({ path: file })
    console.log(`  ✓ ${basename(file)}`)
  }
}

await browser.close()
server.close()

if (overflowed > 0) {
  console.error(`\n${overflowed} slide(s) com conteúdo cortado — reduza texto ou tamanho de fonte.`)
  process.exitCode = 1
}
