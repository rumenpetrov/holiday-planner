import type { GoogleEvent } from "../data/get-calendar-events";

export const transformToThisYearData = (
  list: GoogleEvent[] = [],
  year?: number,
) => {
  if (!Array.isArray(list) || list.length < 1 || typeof year !== "number") {
    return [];
  }

  // 12 months + 1 from the next year
  let listByMonth = new Array(13).fill([]);

  list.forEach((event: GoogleEvent) => {
    const eventStartDate = new Date(Date.parse(event.start.date));
    const monthIndex = eventStartDate.getMonth();

    // Current year events
    if (eventStartDate.getFullYear() === year && monthIndex < 12) {
      listByMonth[monthIndex] = [...listByMonth[monthIndex], event];
    }

    // January next year
    if (eventStartDate.getFullYear() === year + 1 && monthIndex === 0) {
      listByMonth[12] = [...listByMonth[12], event];
    }
  });

  return listByMonth;
};

export default transformToThisYearData;
