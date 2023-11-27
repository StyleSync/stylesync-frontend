import type { weekdays } from '@/modules/schedule/constants/schedule.constants';
import type { Day } from '@prisma/client';

export type Weekday = (typeof weekdays)[number];

export type DailySchedule = {
  workHours: string; // time range 'HH:mm - HH:mm'
  breaks: {
    id?: string;
    timerange: string;
  }[]; // time range array
  isActive: boolean;
};

export type WeeklySchedule = {
  [key in Day]: DailySchedule;
};
