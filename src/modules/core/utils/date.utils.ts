import { eachDayOfInterval, getDay } from 'date-fns';
import { Day } from '@prisma/client';

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

export const mapDateToDayEnum = (dateString: string) => {
  const dayNumber = getDay(new Date(dateString));
  const dayMap = {
    0: Day.SUNDAY,
    1: Day.MONDAY,
    2: Day.TUESDAY,
    3: Day.WEDNESDAY,
    4: Day.THURSDAY,
    5: Day.FRIDAY,
    6: Day.SATURDAY,
  };

  return dayMap[dayNumber];
};
