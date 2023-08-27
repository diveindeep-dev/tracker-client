import { add, format } from 'date-fns';

export const make2week = (date?: string) => {
  const twoWeeks = [];
  const dateFormat = new Date(date || new Date());
  for (let i = 0; i < 14; i++) {
    const day = add(dateFormat, { days: i });
    twoWeeks.push(format(day, 'yyyy-MM-dd'));
  }

  return twoWeeks;
};