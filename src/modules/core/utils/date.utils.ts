import { eachDayOfInterval } from 'date-fns';

export const generateDates = () => {
  const currentDate = new Date();
  const numberOfDays = 13;

  const endOfWeek = new Date(
    new Date().setDate(currentDate.getDate() + numberOfDays)
  );
  const daysOfWeek = eachDayOfInterval({ start: currentDate, end: endOfWeek });
  const result = daysOfWeek.map((item) => item.toISOString());

  return result;
};
