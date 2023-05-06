import type { GoogleEvent } from '../data/get-calendar-events';

export const sortCalendarEvents = (data: GoogleEvent[] = []) => {
  return data.sort((a, b) => Date.parse(a.start.date) - Date.parse(b.start.date));
};

export default sortCalendarEvents;
