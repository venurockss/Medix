import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // This ensures the base path for assets and routing is correct for deployment
  build: {
    outDir: 'dist', // Make sure the output directory is set correctly
    assetsDir: 'assets', // Optional: you can set a specific assets directory if required
  },
})
