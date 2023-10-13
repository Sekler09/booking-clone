import { addDays, format, startOfDay } from 'date-fns';

export function getArrayOfDatesBetween(start, end) {
  const res = [];
  let date = startOfDay(start);
  while (date <= end) {
    res.push(format(date, 'y-M-d'));
    date = addDays(date, 1);
  }
  return res;
}
