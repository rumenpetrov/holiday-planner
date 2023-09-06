import type { GoogleEvent } from '../data/get-calendar-events';

export const addExtraProperties = (data: GoogleEvent[] = [], locale: string = 'bg') => {
  return data.map((day: GoogleEvent) => {
    const startDate = new Date(Date.parse(day.start.date));
    const displayDate = startDate.toLocaleDateString('bg');
    const displaySummary = locale === 'bg'
      ? day.summary.replace('Day off for', 'Компенсация за')
      : day.summary;

    return {
      ...day,
      start: {
        ...day.start,
        displayDate,
      },
      displaySummary,
    };
  });
};

export default addExtraProperties;
