import { eachDayOfInterval } from 'date-fns';
// import { enUS } from 'date-fns/locale';

export const generateDates = () => {
  const currentDate = new Date();
  const numberOfDays = 13;

  const endOfWeek = new Date(
    new Date().setDate(currentDate.getDate() + numberOfDays)
  );
  const daysOfWeek = eachDayOfInterval({ start: currentDate, end: endOfWeek });
  const result = daysOfWeek.map((item) => item.toISOString());

  // console.log(daysOfWeek);

  // const result = daysOfWeek.map((day) => {
  //   const dayOfWeek = format(day, 'EEE', { locale: enUS });
  //   const dayNumber = format(day, 'd');
  //   const month = format(day, 'MMM', { locale: enUS });

  //   return { day: dayOfWeek, number: dayNumber, month };
  // });

  return result;
};
