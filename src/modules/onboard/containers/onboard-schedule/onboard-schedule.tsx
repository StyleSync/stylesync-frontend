import { type FC } from 'react';
// components
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
// containers
import { ProfessionalScheduleForm } from '@/modules/schedule/containers/professional-schedule-form';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

export const OnboardSchedule: FC<ProOnboardStepProps> = ({ next, back }) => {
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
