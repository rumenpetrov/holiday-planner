// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://pochivnik.rpetrov.dev",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  prefetch: true,
  redirects: {
    "/": "/bg/",
  },
  i18n: {
    defaultLocale: "bg",
    locales: ["bg", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => page !== "https://pochivnik.rpetrov.dev/",
      i18n: {
        defaultLocale: "bg",
        locales: {
          bg: "bg",
          en: "en",
        },
      },
    }),
  ],
});
