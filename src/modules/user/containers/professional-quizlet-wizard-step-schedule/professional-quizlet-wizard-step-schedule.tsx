import { type FC } from 'react';
// components
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
// containers
import { ProfessionalScheduleForm } from '@/modules/schedule/containers/professional-schedule-form';
// types
import type { ProfessionalQuizletWizardStepProps } from '@/modules/user/containers/professional-quizlet-wizard/professional-quizlet-wizard.interface';

export const ProfessionalQuizletWizardStepSchedule: FC<
  ProfessionalQuizletWizardStepProps
> = ({ next, back }) => {
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
      <ProfessionalScheduleForm />
    </ProfessionalQuizletWizardStepLayout>
  );
};
