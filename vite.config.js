import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Add a base path
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    hmr: {
      overlay: true
    }
  },
  build: {
    sourcemap: true,
    outDir: 'dist'
  }
})