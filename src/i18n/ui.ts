export const languageList = [
  { locale: "bg", name: "Български" },
  { locale: "en", name: "English" },
];

export const defaultLocale = "bg";

export const ui = {
  bg: {
    "GLOBAL.PROJECT_NAME": "Почивник",
    "GLOBAL.WIP": "в процес на изграждане",
    "GLOBAL.ERROR": "Има проблем!",
    "GLOBAL.LEGEND.TITLE": "Легенда:",
    "GLOBAL.LEGEND.HOLIDAY": "Официален празник",
    "GLOBAL.LEGEND.SUGGESTION": "Предложение за почивен ден",
    "GLOBAL.LEGEND.TODAY": "Днес",
    "GLOBAL.EXPORT_AS_MARKDOWN": "Запази като markdown",
    "GLOBAL.HEADER.LOGO_LABEL": "Лого",
    "GLOBAL.HEADER.TOGGLE_THEME_LABEL": "Промени цветовата схема",
    "GLOBAL.HEADER.CHANGE_LANGUAGE_LABEL": "Промени езика",
    "GLOBAL.PRIMARY_NAVIGATION_LABEL": "Основна навигация",
    "GLOBAL.TIMELINE.LABEL": "Списък с почивните дни по месеци",
    "PAGES.HOME.TITLE": "Начало",
    "PAGES.HOME.INTRO.TITLE": "Доведи празниците при себе си!",
    "PAGES.HOME.INTRO.DESCRIPTION":
      "Разгледай всички официални празници през годината, за да можеш по-лесно да планираш своите почивни дни.",
    "PAGES.HOME.INTRO.TO_THIS_YEAR": "Към тази година",
    "PAGES.HOME.INTRO.LABEL": "Интродукция",
    "PAGES.HOME.SECTION_THIS_MONTH.TITLE": "Официални почивни дни този месец",
    "PAGES.THIS_YEAR.TITLE": "Тази година",
    "PAGES.NEXT_YEAR.TITLE": "Следваща година",
  },
  en: {
    "GLOBAL.PROJECT_NAME": "Pochivnik",
    "GLOBAL.WIP": "work in progress",
    "GLOBAL.ERROR": "There is a problem!",
    "GLOBAL.LEGEND.TITLE": "Legend:",
    "GLOBAL.LEGEND.HOLIDAY": "Public holiday",
    "GLOBAL.LEGEND.SUGGESTION": "Day off suggestion",
    "GLOBAL.LEGEND.TODAY": "Today",
    "GLOBAL.EXPORT_AS_MARKDOWN": "Export as Markdown",
    "GLOBAL.HEADER.LOGO_LABEL": "Logo",
    "GLOBAL.HEADER.TOGGLE_THEME_LABEL": "Toggle theme",
    "GLOBAL.HEADER.CHANGE_LANGUAGE_LABEL": "Change language",
    "GLOBAL.PRIMARY_NAVIGATION.LABEL": "Primary navigation",
    "GLOBAL.TIMELINE.LABEL": "List with all vacant days by month",
    "PAGES.HOME.TITLE": "Home",
    "PAGES.HOME.INTRO.TITLE": "Bring the holidays to you!",
    "PAGES.HOME.INTRO.DESCRIPTION":
      "Go over all public holidays throughout the year, so you can easily plan your days off.",
    "PAGES.HOME.INTRO.TO_THIS_YEAR": "To this year",
    "PAGES.HOME.INTRO.LABEL": "Introduction",
    "PAGES.HOME.SECTION_THIS_MONTH.TITLE": "Public holidays this month",
    "PAGES.THIS_YEAR.TITLE": "This year",
    "PAGES.NEXT_YEAR.TITLE": "Next year",
  },
} as const;
