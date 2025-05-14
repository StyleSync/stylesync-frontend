import { differenceInMinutes } from 'date-fns';

export const isScheduleDayOff = <
  T extends {
    start: Date;
    end: Date;
  },
>(
  existingSchedule: T
) => {
  const maxMinutes = 15;

  return (
    !!existingSchedule &&
    differenceInMinutes(existingSchedule.end, existingSchedule.start) <
      maxMinutes
  );
};
