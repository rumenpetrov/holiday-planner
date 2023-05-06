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
  calendarId?: string;
  accessKey?: string;
};

export const getCalendarEvents =  async (params: Params): Promise<{ data: GoogleEvent[], error: any }> => {
  const {
    fromYear,
    toYear,
    calendarId = import.meta.env.CALENDAR_ID,
    accessKey = import.meta.env.ACCESS_KEY,
  } = params;
  const from = `${fromYear}-01-01T00:00:00Z`;
  const to = `${toYear}-02-01T00:00:00Z`;
  const URL = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?timeMin=${from}&timeMax=${to}&maxResults=500&key=${accessKey}`;

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
