import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  /* `unico` é a build que vira o .html de arquivo único.
     Ela sai como script clássico (IIFE), não como módulo ES: módulo
     aberto por file:// é bloqueado pela política de origem na maioria
     dos navegadores de celular — a página carrega o CSS, pinta o fundo
     preto e o React nunca monta. Script clássico não tem essa
     restrição e abre em qualquer aparelho. */
  const unico = mode === 'unico'

  return {
    plugins: [react()],
    // Fontes, artes e favicon vivem na pasta pública do repositório: uma única
    // fonte de verdade para os ativos de marca, sem duplicar 9 MB de PNG.
    publicDir: '../public',
    server: { port: 5174 },
    preview: { port: 5174 },
    build: {
      /* es2017: o alvo anterior (es2019) deixava passar `?.`, que é
         erro de sintaxe em iOS anterior ao 13.4 — e erro de sintaxe
         derruba o arquivo inteiro, não só a linha. */
      target: 'es2017',
      assetsInlineLimit: 0,
      ...(unico
        ? {
            outDir: 'dist-unico',
            // o .html de envio não usa a pasta pública: tudo vai embutido
            copyPublicDir: false,
            modulePreload: false as const,
            /* CSS em arquivo próprio, não injetado pelo JS: assim ele
               entra no <style> do topo e a página já nasce pintada, sem
               depender do script para ter cor. */
            cssCodeSplit: false,
            rollupOptions: {
              output: {
                format: 'iife' as const,
                inlineDynamicImports: true,
                entryFileNames: 'assets/app.js',
                assetFileNames: 'assets/app.[ext]',
              },
            },
          }
        : {}),
    },
  }
})
