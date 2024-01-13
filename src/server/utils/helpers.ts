import { getDay } from 'date-fns';
import { type Booking, type Break, Day, type Schedule } from '@prisma/client';

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

    if (inputStartTime < breakEndTime && inputEndTime > breakStartTime) {
      return false; // Return false if input times fall within a break
    }
  }

  return inputStartTime >= scheduleStartTime && inputEndTime <= scheduleEndTime;
};

export const isTimeWithinBookings = (
  startTime: string,
  endTime: string,
  bookings: Booking[]
): boolean => {
  const inputStartTime = new Date(startTime);
  const inputEndTime = new Date(endTime);

  for (const booking of bookings) {
    const bookingStartTime = new Date(booking.startTime);
    const bookingEndTime = new Date(booking.endTime);

    if (inputStartTime < bookingEndTime && inputEndTime > bookingStartTime) {
      return true;
    }
  }

  return false;
};
