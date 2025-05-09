import { Day } from '@prisma/client';
import { getDay } from 'date-fns';

import { formatTimeRange, Time } from '@/modules/core/utils/time.utils';
import type {
  Weekday,
  WeeklySchedule,
} from '@/modules/schedule/types/schedule.types';

export const weekdays: Day[] = [
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
  Day.SUNDAY,
];

export const emptySchedule = weekdays.reduce<WeeklySchedule>((res, current) => {
  return {
    ...res,
    [current]: {
      workHours: formatTimeRange(new Time(), new Time()),
      breaks: [],
      isActive: false,
    },
  };
}, {} as any);

export const today: Weekday = weekdays[getDay(new Date())];
