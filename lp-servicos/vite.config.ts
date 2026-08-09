import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Fontes, artes e favicon vivem na pasta pública do repositório: uma única
  // fonte de verdade para os ativos de marca, sem duplicar 9 MB de PNG.
  publicDir: '../public',
  server: { port: 5174 },
  preview: { port: 5174 },
  build: {
    target: 'es2019',
    assetsInlineLimit: 0,
  },
})
