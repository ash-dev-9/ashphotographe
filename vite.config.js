import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('framer-motion') || id.includes('gsap')) return 'animation';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    hmr: { overlay: false },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', 'framer-motion'],
  },
})
