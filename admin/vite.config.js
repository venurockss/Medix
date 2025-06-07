import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    
    nodePolyfills({
      // Enable polyfills for specific Node.js modules
      buffer: true,
    }),
  ],
  server: { port: 5174 },
});