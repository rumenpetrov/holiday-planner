/**
 * 1 - Monday
 * 2 - Tuesday
 * 3 - Wednesday
 * 4 - Thursday
 * 5 - Friday
 * 6 - Saturday
 * 7 - Sunday
 */
export const getFirstDayOfMonthNumber = (
  monthIndex: number,
  year: number,
): number => {
  const index = new Date(year, monthIndex).getDay();
  let realIndex = 1;

  if (index === 0) {
    realIndex = 7;
  } else {
    realIndex = index;
  }

  return realIndex;
};

export const getTotalDaysInMonth = (
  monthIndex: number,
  year: number,
): number => {
  return 32 - new Date(year, monthIndex, 32).getDate();
};

export interface Day {
  label: string;
  holiday?: boolean;
  suggestion?: boolean;
}

export type WeekData = Day[];
export type MothData = WeekData[];

const weekendIndexes = [5, 6];

export const composeMonthData = (
  monthIndex: number,
  year: number,
  holidays: number[],
): MothData => {
  const firstDayNumber = getFirstDayOfMonthNumber(monthIndex, year);
  const totalDays = getTotalDaysInMonth(monthIndex, year);
  const data: MothData = [[], [], [], [], [], []];

  // Filler days from the previous month
  for (let i = 1; i < firstDayNumber; i++) {
    data[0].push({
      label: "preMonth",
    });
  }

  // Fill in each day of the month and mark holidays
  for (let dayOfMonth = 1; dayOfMonth <= totalDays; dayOfMonth++) {
    // 6 weeks in total
    for (let weekIndex = 0; weekIndex <= 5; weekIndex++) {
      if (data[weekIndex].length < 7) {
        data[weekIndex].push({
          label: dayOfMonth.toString(),
          holiday: holidays.includes(dayOfMonth),
          suggestion: false,
        });
        break;
      }
    }
  }

  // Filler days from the next month
  while (data[4].length < 7) {
    data[4].push({
      label: "postMonth",
    });
  }

  while (data[5].length < 7) {
    data[5].push({
      label: "postMonth",
    });
  }

  // Set suggestions
  const output = data.map((week: WeekData) => {
    const matchedHolidays = week.find((day) => day.holiday);

    if (matchedHolidays) {
      return week.map((day: Day, index: number) => ({
        ...day,
        suggestion:
          weekendIndexes.includes(index) || day.holiday ? false : true,
      }));
    }

    return week;
  });

  return output;
};

export const getWeekDays = (locale: string): string[] => {
  let baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  let weekDays = [];

  for (let i = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: "short" }));
    baseDate.setDate(baseDate.getDate() + 1);
  }

  return weekDays;
};
