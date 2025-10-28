import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],

  build: {
    outDir: "dist", // ✅ Vercel looks for this
    emptyOutDir: true, // cleans before rebuild
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // optional, for clean imports
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:4000", // ✅ lets you call Express API locally
    },
  },
})
