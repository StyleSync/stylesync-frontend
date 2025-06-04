import { type FC, useState } from 'react';

import { useIntl } from 'react-intl';

import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';
import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
import { WeeklyScheduleForm } from '@/modules/schedule/containers/schedule-form';
import type { WeeklySchedule } from '@/modules/schedule/types/schedule.types';

export const OnboardSchedule: FC<ProOnboardStepProps> = ({ next, back }) => {
  const intl = useIntl();

  const [schedule, setSchedule] = useState<WeeklySchedule>(emptySchedule);

  return (
    <OnboardLayout
      meta={{
        title: intl.formatMessage({ id: 'onboard.schedule.title' }),
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
