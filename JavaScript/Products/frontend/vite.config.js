import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"],
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@tailwind base; @tailwind components; @tailwind utilities;',
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
