import type { GoogleEvent } from "../data/get-calendar-events";

export const transformToThisMonthData = (
  list: GoogleEvent[] = [],
  monthIndexChoice?: number,
) => {
  return list.filter((event: GoogleEvent) => {
    const eventStartDate = new Date(Date.parse(event.start.date));
    const monthIndex = eventStartDate.getMonth();
    const selectedMonthIndex =
      typeof monthIndexChoice === "number"
        ? monthIndexChoice
        : new Date().getMonth();

    if (monthIndex === selectedMonthIndex) {
      return true;
    }

    return false;
  });
};

export default transformToThisMonthData;
