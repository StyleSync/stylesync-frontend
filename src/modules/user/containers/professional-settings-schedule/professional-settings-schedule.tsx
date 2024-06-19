import { type FC, useState } from 'react';
import { useIntl } from 'react-intl';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
// containers
import { WeeklyScheduleForm } from '@/modules/schedule/containers/schedule-form';
// constants
import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
// types
import type { WeeklySchedule } from '@/modules/schedule/types/schedule.types';

export const ProfessionalSettingsSchedule: FC = () => {
  const intl = useIntl();
  // state
  const [schedule, setSchedule] = useState<WeeklySchedule>(emptySchedule);

  return (
    <ProfileSettingsTabContentLayout
      title={intl.formatMessage({ id: 'professional.settings.schedule.title' })}
      icon='calendar'
    >
      <WeeklyScheduleForm schedule={schedule} setSchedule={setSchedule} />
    </ProfileSettingsTabContentLayout>
  );
};
