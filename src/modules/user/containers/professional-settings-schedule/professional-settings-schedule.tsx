import { type FC, useState } from 'react';

import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
import { DailyScheduleForm } from '@/modules/schedule/containers/daily-schedule-form';
import { WeeklyScheduleForm } from '@/modules/schedule/containers/schedule-form';
import type { WeeklySchedule } from '@/modules/schedule/types/schedule.types';
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';

export const ProfessionalSettingsSchedule: FC = () => {
  // state
  const [schedule, setSchedule] = useState<WeeklySchedule>(emptySchedule);

  return (
    <ProfileSettingsTabContentLayout
      title={'professional.settings.schedule.title'}
      icon='calendar'
    >
      <div className='flex flex-col'>
        <DailyScheduleForm />

        <WeeklyScheduleForm schedule={schedule} setSchedule={setSchedule} />
      </div>
    </ProfileSettingsTabContentLayout>
  );
};
