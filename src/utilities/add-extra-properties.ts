import type { GoogleEvent } from '../data/get-calendar-events';

export const addExtraProperties = (data: GoogleEvent[] = []) => {
  return data.map((day: GoogleEvent) => {
    const startDate = new Date(Date.parse(day.start.date));

    return {
      ...day,
      start: {
        ...day.start,
        displayDate: `${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}`,
      },
      displaySummary: day.summary.replace('Day off for', 'Компенсация за'),
    };
  });
};

export default addExtraProperties;
