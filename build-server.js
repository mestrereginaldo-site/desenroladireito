import { build } from 'vite'
import { createServer } from 'vite'

// Build do servidor
await build({
  build: {
    outDir: 'server/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'server/index.js',
      output: {
        format: 'esm'
      }
    }
  }
})
