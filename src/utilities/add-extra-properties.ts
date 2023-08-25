import type { GoogleEvent } from '../data/get-calendar-events';

export const addExtraProperties = (data: GoogleEvent[] = [], locale: string = 'bg') => {
  return data.map((day: GoogleEvent) => {
    const startDate = new Date(Date.parse(day.start.date));
    const displayDate = startDate.toLocaleDateString(locale);

    return {
      ...day,
      start: {
        ...day.start,
        displayDate,
      },
      displaySummary: day.summary.replace('Day off for', 'Компенсация за'),
    };
  });
};

export default addExtraProperties;
