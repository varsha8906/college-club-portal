import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/college-club-portal/', // ✅ required for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
