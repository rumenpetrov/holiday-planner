export interface GoogleEvent {
  summary: string,
  description: string,
  start: {
    date: string,
  },
}

export const getCalendarEvents =  async (params: { fromYear: number, toYear: number }): Promise<{ data: GoogleEvent[], error: any }> => {
  const { fromYear, toYear } = params;
  const from = `${fromYear}-01-01T00:00:00Z`;
  const to = `${toYear}-02-01T00:00:00Z`;
  const URL = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(import.meta.env.CALENDAR_ID)}/events?timeMin=${from}&timeMax=${to}&maxResults=500&key=${import.meta.env.ACCESS_KEY}`;

  const response = await fetch(URL);
  try {
    const data = await response.json();

    return {
      data: data?.items,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error,
    };
  }
};

export default getCalendarEvents;
