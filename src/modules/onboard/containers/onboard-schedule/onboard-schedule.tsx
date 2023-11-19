import { type FC, useState } from 'react';
// components
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
// containers
import { WeeklyScheduleForm } from '@/modules/schedule/containers/schedule-form';
// constants
import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';
import type { WeeklySchedule } from '@/modules/schedule/types/schedule.types';

export const OnboardSchedule: FC<ProOnboardStepProps> = ({ next, back }) => {
  const [schedule, setSchedule] = useState<WeeklySchedule>(emptySchedule);

  return (
    <OnboardLayout
      meta={{
        title: 'Schedule',
        description: 'todo...',
      }}
      nextButtonProps={{
        onClick: next,
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <WeeklyScheduleForm schedule={schedule} setSchedule={setSchedule} />
    </OnboardLayout>
  );
};
