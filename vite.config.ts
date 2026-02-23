import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  // ── Dev server ─────────────────────────────────────────────
  // Serves the project root (including dist/) as static files.
  // After `npm run build`, dist/widget.js is available at:
  //   http://localhost:5173/dist/widget.js
  // After `npm run serve-widget`, widget.js is at:
  //   http://localhost:4000/widget.js
  server: {
    port: 5173,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    fs: {
      // Allow serving files from the project root (including dist/)
      allow: ['.'],
    },
  },

  // ── Library build ──────────────────────────────────────────
  build: {
    lib: {
      entry: resolve(__dirname, 'src/widget-entry.tsx'),
      name: 'ChatBot',
      formats: ['iife'],
      fileName: () => 'widget.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 100000,
    // Output to dist/ (default)
    outDir: 'dist',
  },

  define: {
    'process.env.NODE_ENV': '"production"',
  },
})
