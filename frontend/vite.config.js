import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local `python run.py` builds into backend/static; Vercel frontend service uses dist/.
const isVercel = Boolean(process.env.VERCEL)

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: isVercel ? 'dist' : '../backend/static',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
