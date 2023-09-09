import { type FC } from 'react';
// components
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
// types
import type { ProfessionalQuizletWizardStepProps } from '@/modules/user/containers/professional-quizlet-wizard/professional-quizlet-wizard.interface';

export const ProfessionalQuizletWizardStepServices: FC<
  ProfessionalQuizletWizardStepProps
> = ({ next, back }) => {
  return (
    <ProfessionalQuizletWizardStepLayout
      meta={{
        title: 'Services',
        description: 'todo...',
      }}
      nextButtonProps={{
        onClick: next,
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <ProfessionalServicesForm />
    </ProfessionalQuizletWizardStepLayout>
  );
};
