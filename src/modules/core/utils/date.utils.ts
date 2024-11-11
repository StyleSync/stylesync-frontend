import { eachDayOfInterval, getDay, startOfDay } from 'date-fns';
import { Day } from '@prisma/client';
import { type IntlShape } from 'react-intl';

export const generateDates = () => {
  const currentDate = new Date();
  const numberOfDays = 13;

  const endOfWeek = new Date(
    new Date().setDate(currentDate.getDate() + numberOfDays)
  );
  const daysOfWeek = eachDayOfInterval({ start: currentDate, end: endOfWeek });

  return daysOfWeek.map((item) => startOfDay(item).toISOString());
};

export const mapDateToDayEnum = (date: string | number | Date) => {
  const dayNumber = getDay(new Date(date));
  const dayMap: Record<number, Day> = {
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

export const formatDateIntl = (date: Date, intl: IntlShape): string => {
  return intl.formatDate(date, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};
