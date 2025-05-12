import type { Dispatch, SetStateAction } from 'react';

import type { WeeklySchedule } from '@/modules/schedule/types/schedule.types';

export type WeeklyScheduleFormProps = {
  schedule: WeeklySchedule;
  setSchedule: Dispatch<SetStateAction<WeeklySchedule>>;
};
