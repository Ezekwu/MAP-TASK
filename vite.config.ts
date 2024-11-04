import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    })
  ],
})
