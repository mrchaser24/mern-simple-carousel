import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // setting this proxy to avoid calling localhost everytime
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  }
})
