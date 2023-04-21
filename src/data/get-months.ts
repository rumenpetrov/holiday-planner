export interface Month {
  id: number,
  name: string,
  nameEn: string,
};

export const getMonths = (): { data: Month[], error: any } => {
  return {
    data: [
      {
        id: 1,
        name: 'Януари',
        nameEn: 'January',
      },
      {
        id: 2,
        name: 'Февруари',
        nameEn: 'February',
      },
      {
        id: 3,
        name: 'Март',
        nameEn: 'March',
      },
      {
        id: 4,
        name: 'Април',
        nameEn: 'April',
      },
      {
        id: 5,
        name: 'Май',
        nameEn: 'May',
      },
      {
        id: 6,
        name: 'Юни',
        nameEn: 'June',
      },
      {
        id: 7,
        name: 'Юли',
        nameEn: 'July',
      },
      {
        id: 8,
        name: 'Август',
        nameEn: 'August',
      },
      {
        id: 9,
        name: 'Септември',
        nameEn: 'September',
      },
      {
        id: 10,
        name: 'Октомври',
        nameEn: 'October',
      },
      {
        id: 11,
        name: 'Ноември',
        nameEn: 'November',
      },
      {
        id: 12,
        name: 'Декември',
        nameEn: 'December',
      },
    ],
    error: null,
  };
};

export default getMonths;
