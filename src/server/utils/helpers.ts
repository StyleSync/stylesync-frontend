import { addMinutes, getDay, isBefore, isSameDay } from 'date-fns';
import { type Break, Day, type Schedule } from '@prisma/client';
import type { AvailableBookingTime } from '@/server/types';

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

export const isTimeWithinSchedule = (
  startTime: string,
  endTime: string,
  schedule: Pick<Schedule, 'start' | 'end'> & {
    breaks: Pick<Break, 'start' | 'end'>[];
  }
): boolean => {
  const inputStartTime = new Date(startTime);
  const inputEndTime = new Date(endTime);

  const scheduleStartTime = new Date(startTime);

  scheduleStartTime.setHours(
    new Date(schedule.start).getHours(),
    new Date(schedule.start).getMinutes(),
    new Date(schedule.start).getSeconds()
  );

  const scheduleEndTime = new Date(endTime);

  scheduleEndTime.setHours(
    new Date(schedule.end).getHours(),
    new Date(schedule.end).getMinutes(),
    new Date(schedule.end).getSeconds()
  );

  // Check if input times fall within any breaks
  for (const breakTime of schedule.breaks) {
    const breakStartTime = new Date(startTime);

    breakStartTime.setHours(
      new Date(breakTime.start).getHours(),
      new Date(breakTime.start).getMinutes(),
      new Date(breakTime.start).getSeconds()
    );

    const breakEndTime = new Date(endTime);

    breakEndTime.setHours(
      new Date(breakTime.end).getHours(),
      new Date(breakTime.end).getMinutes(),
      new Date(breakTime.end).getSeconds()
    );

    if (
      !isSameDay(new Date(breakTime.start), new Date(breakTime.end)) &&
      isSameDay(new Date(startTime), new Date(endTime))
    ) {
      breakEndTime.setDate(new Date(breakEndTime).getDate() + 1);
    }

    if (inputStartTime < breakEndTime && inputEndTime > breakStartTime) {
      return false; // Return false if input times fall within a break
    }
  }

  return inputStartTime >= scheduleStartTime && inputEndTime <= scheduleEndTime;
};

export const isTimeWithinPeriods = (
  startTime: string,
  endTime: string,
  periods: { startTime: string | Date; endTime: string | Date }[]
): boolean => {
  const inputStartTime = new Date(startTime);
  const inputEndTime = new Date(endTime);

  for (const period of periods) {
    const periodStartTime = new Date(period.startTime);
    const periodEndTime = new Date(period.endTime);

    if (inputStartTime < periodEndTime && inputEndTime > periodStartTime) {
      return true;
    }
  }

  return false;
};

const defaultPeriod = 15; // minutes;

export const getPossibleBookingTimes = (
  currentDaySchedule: Pick<Schedule, 'start' | 'end'>,
  duration: number, // in minutes
  year: number,
  month: number,
  day: number,
  period: number = defaultPeriod
): AvailableBookingTime[] => {
  const availableTimeList: AvailableBookingTime[] = [];
  let iteration = 0;

  let startTime = new Date(currentDaySchedule.start);
  const endTime = new Date(currentDaySchedule.end);

  if (isSameDay(startTime, endTime)) {
    startTime.setFullYear(year);
    startTime.setMonth(month);
    startTime.setDate(day);
    endTime.setFullYear(year);
    endTime.setMonth(month);
    endTime.setDate(day);
  } else {
    startTime.setFullYear(year);
    startTime.setMonth(month);
    startTime.setDate(day);
    endTime.setFullYear(year);
    endTime.setMonth(month);
    endTime.setDate(day + 1);
  }

  while (
    isBefore(addMinutes(startTime, duration), endTime) &&
    iteration < 100
  ) {
    const bookingTime: AvailableBookingTime = {
      startTime: startTime.toISOString(),
      endTime: new Date(addMinutes(startTime, duration)).toISOString(),
    };

    availableTimeList.push(bookingTime);

    // Increment the start time by the period
    startTime = new Date(addMinutes(startTime, period));
    iteration += 1;
  }

  return availableTimeList;
};

/**
 * Merges a date and a time into a single ISO string.
 *
 * @param {string} date - The date string in ISO format (YYYY-MM-DD).
 * @param {string} time - The time string in ISO format (HH:mm:ss).
 * @returns {string} The merged date and time in ISO format.
 *
 * @example
 * // returns "2022-03-01T14:30:00.000Z"
 * mergeDates("2022-03-01", "14:30:00")
 */
export const mergeDates = (
  date: string | Date,
  time: string | Date
): string | Date => {
  try {
    const dateObj = new Date(date);
    const timeObj = new Date(time);

    dateObj.setHours(
      timeObj.getHours(),
      timeObj.getMinutes(),
      timeObj.getSeconds()
    );

    return dateObj.toISOString();
  } catch (e) {
    return date;
  }
};
