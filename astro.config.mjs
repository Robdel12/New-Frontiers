import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://robertdelu.ca',
  integrations: [sitemap()],
  // Disable TypeScript checking completely
  vite: {
    esbuild: {
      target: 'es2022',
    },
  },
})
