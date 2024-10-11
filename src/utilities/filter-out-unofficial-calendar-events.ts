import type { GoogleEvent } from "../data/get-calendar-events";

export const filterOutUnofficialCalendarEvents = (list: GoogleEvent[] = []) => {
  return list.filter(
    (event) =>
      event.description === "Официален празник" ||
      event.description === "Public holiday",
  );
};

export default filterOutUnofficialCalendarEvents;
