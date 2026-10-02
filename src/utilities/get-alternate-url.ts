import { languageList } from "@i18n/ui";

export const getAlternateUrl = (
  targetLocale: string,
  pathname: string,
  site?: URL | string
): URL => {
  const parts = pathname.split('/').filter(Boolean);
  const currentLocales = languageList.map(l => l.locale);
  
  if (parts.length > 0 && currentLocales.includes(parts[0])) {
    parts[0] = targetLocale;
  } else {
    parts.unshift(targetLocale);
  }
  
  const newPath = '/' + parts.join('/') + (pathname.endsWith('/') ? '/' : '');
  return new URL(newPath, site || '');
};
