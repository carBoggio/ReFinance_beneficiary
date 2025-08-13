import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve'
  
  return {
    plugins: [
      react(),
      // Only enable PWA in production build
      !isDev && VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          skipWaiting: true,
          clientsClaim: true,
          // Exclude development files from precaching
          exclude: [
            /node_modules/,
            /vite\.svg/,
            /favicon\.ico/,
            /manifest\.webmanifest/
          ],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            }
          ]
        },
        manifest: {
          name: "ReFinance - Plataforma de Financiamiento Comunitario",
          short_name: "ReFinance",
          description: "Plataforma de financiamiento comunitario para proyectos sostenibles",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#3b82f6",
          icons: [
            {
              src: "/vite.svg",
              sizes: "any",
              type: "image/svg+xml",
              purpose: "any maskable"
            }
          ]
        },
        // Disable PWA in development
        devOptions: {
          enabled: false
        }
      })
    ].filter(Boolean),
    server: {
      port: 5173,
      host: true
    },
    build: {
      rollupOptions: {
        input: {
          main: './index.html'
        }
      }
    },
    // Define global variables for stellar-wallets-kit compatibility
    define: {
      global: 'globalThis',
      'process.env': {}
    },
    // Optimize dependencies for stellar-wallets-kit
    optimizeDeps: {
      include: ['@creit.tech/stellar-wallets-kit']
    }
  }
})
