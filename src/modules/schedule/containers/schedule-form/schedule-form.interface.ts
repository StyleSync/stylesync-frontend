import type { WeeklySchedule } from '@/modules/schedule/types/schedule.types';
import type { Dispatch, SetStateAction } from 'react';

export type WeeklyScheduleFormProps = {
  schedule: WeeklySchedule;
  setSchedule: Dispatch<SetStateAction<WeeklySchedule>>;
};
