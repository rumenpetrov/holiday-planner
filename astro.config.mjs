// @ts-check
import { defineConfig } from "astro/config";

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
  i18n: {
    defaultLocale: "bg",
    locales: ["bg", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
});
