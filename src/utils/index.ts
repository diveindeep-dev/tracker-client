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

export const calculateByte = (text: string): number => {
  let total = 0;

  for (let i = 0; i < text.length; i++) {
    const charCode = text[i].charCodeAt(0);
    if (charCode > 127) {
      total += 2;
    } else {
      total += 1;
    }
  }

  return total;
};
