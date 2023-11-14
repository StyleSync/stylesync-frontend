import type { Day, Schedule } from '@prisma/client';

export type DayScheduleSelectProps = {
  weekday: Day;
  dailySchedule?: Omit<Schedule, 'professionalId'>;
  onUpdate?: () => void;
};
