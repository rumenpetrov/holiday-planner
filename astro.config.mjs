import { defineConfig } from 'astro/config';
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  site: 'https://rumenpetrov.github.io',
  base: '/holiday-planner',
  integrations: [lit()]
});
