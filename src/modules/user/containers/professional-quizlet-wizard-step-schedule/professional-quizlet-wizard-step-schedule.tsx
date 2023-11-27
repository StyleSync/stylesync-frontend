import { type FC, useState } from 'react';
// components
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
// containers
import { WeeklyScheduleForm } from '@/modules/schedule/containers/schedule-form';
// constants
import { emptySchedule } from '@/modules/schedule/constants/schedule.constants';
// types
import type { ProfessionalQuizletWizardStepProps } from '@/modules/user/containers/professional-quizlet-wizard/professional-quizlet-wizard.interface';
import type { WeeklySchedule } from '@/modules/schedule/types/schedule.types';

export const ProfessionalQuizletWizardStepSchedule: FC<
  ProfessionalQuizletWizardStepProps
> = ({ next, back }) => {
  // state
  const [schedule, setSchedule] = useState<WeeklySchedule>(emptySchedule);

  return (
    <ProfessionalQuizletWizardStepLayout
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
    </ProfessionalQuizletWizardStepLayout>
  );
};
