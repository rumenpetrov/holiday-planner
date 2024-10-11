import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  site: "https://rumenpetrov.github.io",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  base: "/holiday-planner",
  prefetch: true,
  integrations: [astroI18next(), lit()],
});
