import { ui, defaultLocale } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, , locale] = url.pathname.split("/");
  if (locale in ui) return locale as keyof typeof ui;
  return defaultLocale;
}

export function useTranslations(locale: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLocale]) {
    return (ui[locale] as any)?.[key] || ui[defaultLocale][key];
  };
}

export function generateLink(locale: keyof typeof ui, path: string) {
  const pathWithoutFrontSlash = path.startsWith("/") ? path.slice(1) : path;
  return `/holiday-planner/${locale}/${pathWithoutFrontSlash}`;
}
