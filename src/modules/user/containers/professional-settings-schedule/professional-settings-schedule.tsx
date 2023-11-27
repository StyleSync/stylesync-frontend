import { type FC, useState } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
// containers
import { WeeklyScheduleForm } from '@/modules/schedule/containers/schedule-form';
// constants
import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
// types
import type { WeeklySchedule } from '@/modules/schedule/types/schedule.types';

export const ProfessionalSettingsSchedule: FC = () => {
  // state
  const [schedule, setSchedule] = useState<WeeklySchedule>(emptySchedule);

  return (
    <ProfileSettingsTabContentLayout title='Schedule settings' icon='calendar'>
      <WeeklyScheduleForm schedule={schedule} setSchedule={setSchedule} />
    </ProfileSettingsTabContentLayout>
  );
};
