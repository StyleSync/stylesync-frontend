import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';

export const getDaysOfCurrentMonth = (date: Date) => {
  const startDay = startOfMonth(date);
  const endDay = endOfMonth(date);

  return eachDayOfInterval({ start: startDay, end: endDay });
};
