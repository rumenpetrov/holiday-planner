import { defineConfig } from 'astro/config';
import astroI18next from 'astro-i18next';
import lit from '@astrojs/lit';
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
export default defineConfig({
  site: 'https://rumenpetrov.github.io',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  base: '/holiday-planner',
  integrations: [
    astroI18next(),
    lit(),
    prefetch(),
  ],
});
