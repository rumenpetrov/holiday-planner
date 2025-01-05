export interface GoogleEvent {
  summary: string;
  description: string;
  start: {
    date: string;
  };
}

export interface Params {
  fromYear: number;
  toYear: number;
  locale?: string;
  accessKey?: string;
  toNextJanuary?: boolean;
}

const calenarIds = {
  bg: import.meta.env.CALENDAR_ID_BG,
  en: import.meta.env.CALENDAR_ID_EN,
};

export const getCalendarEvents = async (
  params: Params,
): Promise<{ data: GoogleEvent[]; error: any }> => {
  const {
    fromYear,
    toYear,
    locale = "bg",
    accessKey = import.meta.env.ACCESS_KEY,
    toNextJanuary = false,
  } = params;
  const calendarId = calenarIds[locale];
  const from = `${fromYear}-01-01T00:00:00Z`;
  const to = toNextJanuary
    ? `${toYear}-02-01T00:00:00Z`
    : `${toYear}-12-31T00:00:00Z`;
  const URL = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId,
  )}/events?timeMin=${from}&timeMax=${to}&maxResults=500&key=${accessKey}`;

  const response = await fetch(URL);

  try {
    const data = await response.json();

    return {
      data: data?.items,
      error: data?.error?.message || null,
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
};

export default getCalendarEvents;
