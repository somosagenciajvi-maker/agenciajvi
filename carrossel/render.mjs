/**
 * Renderiza cada slide do carrossel em PNG 1080x1350 (formato 4:5 do Instagram).
 * Uso: node carrossel/render.mjs
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = fileURLToPath(new URL('.', import.meta.url))
const ROOT = normalize(join(HERE, '..'))
const OUT = join(HERE, 'out')

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

await new Promise((resolve) => server.listen(4173, resolve))

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 1,
})

await page.goto('http://127.0.0.1:4173/carrossel/index.html', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(600)

const slides = await page.$$('.slide')
for (let i = 0; i < slides.length; i++) {
  const file = join(OUT, `jvi-carrossel-${String(i + 1).padStart(2, '0')}.png`)
  await slides[i].screenshot({ path: file })
  const box = await slides[i].boundingBox()
  console.log(`✓ ${file}  (${Math.round(box.width)}x${Math.round(box.height)})`)
}

await browser.close()
server.close()
