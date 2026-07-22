import { defineConfig, type Plugin } from 'vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// O GitHub Pages não faz fallback para o index.html em rotas do SPA
// (ex.: /testar), retornando 404. Copiamos o index.html gerado para
// 404.html para que o app carregue em qualquer rota e o BrowserRouter
// assuma o roteamento no cliente.
function spaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    spaFallback(),
  ],
})
