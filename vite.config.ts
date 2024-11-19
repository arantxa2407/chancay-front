import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/chancay-front/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8019',
        changeOrigin: true,
        secure: false
      }
    }
  }
})