import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const getDaysOfCurrentMonth = (date: Date) => {
  const startDay = startOfMonth(date);
  const endDay = endOfMonth(date);

  return eachDayOfInterval({ start: startDay, end: endDay });
};
