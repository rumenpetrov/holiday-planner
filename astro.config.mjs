// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { AstroPWAIntegration } from "@vite-pwa/astro";

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
    AstroPWAIntegration({
      registerType: "autoUpdate",
      injectRegister: false,
      includeManifestIcons: false,
      generateSW: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp}"],
        globIgnores: [
          "screenshots/**",
          "og-image.webp",
          "icons/maskable-icon-x1024.png",
        ],
        navigateFallback: null,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-woff2",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        id: "/",
        start_url: "/bg/",
        scope: "/",
        name: "Pochivnik",
        short_name: "Pochivnik",
        description:
          "Go over all public holidays throughout the year, so you can easily plan your days off.",
        display: "standalone",
        theme_color: "#f0eddb",
        background_color: "#f0eddb",
        categories: ["productivity", "events", "lifestyle"],
        icons: [
          {
            src: "/icons/icon-vector.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/maskable-icon-x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/maskable-icon-x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/home-tall-bg.webp",
            sizes: "1442x3202",
            type: "image/webp",
            form_factor: "narrow",
            label: "Home page on mobile",
          },
          {
            src: "/screenshots/this-year-tall-bg.webp",
            sizes: "1442x3202",
            type: "image/webp",
            form_factor: "narrow",
            label: "This year page on mobile",
          },
          {
            src: "/screenshots/this-year-current-month-tall-bg.webp",
            sizes: "1442x3202",
            type: "image/webp",
            form_factor: "narrow",
            label: "This year page current month on mobile",
          },
          {
            src: "/screenshots/home-wide-bg.webp",
            sizes: "1366x958",
            type: "image/webp",
            form_factor: "wide",
            label: "Home page on desktop",
          },
          {
            src: "/screenshots/this-year-wide-bg.webp",
            sizes: "1366x958",
            type: "image/webp",
            form_factor: "wide",
            label: "This year page on desktop",
          },
          {
            src: "/screenshots/this-year-current-month-wide-bg.webp",
            sizes: "1366x958",
            type: "image/webp",
            form_factor: "wide",
            label: "This year page current month on desktop",
          },
        ],
      },
    }),
  ],
});
