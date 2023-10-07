import { type FC, useCallback } from 'react';
// components
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
// containers
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// types
import type { ProfessionalQuizletWizardStepProps } from '@/modules/user/containers/professional-quizlet-wizard/professional-quizlet-wizard.interface';

export const ProfessionalQuizletWizardStepLocation: FC<
  ProfessionalQuizletWizardStepProps
> = ({ back }) => {
  const handleSubmit = useCallback(() => {}, []);

  return (
    <ProfessionalQuizletWizardStepLayout
      meta={{ title: 'Location', description: 'todo...' }}
      nextButtonProps={{
        onClick: handleSubmit,
        text: 'Done',
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <UserLocationSelectForm />
    </ProfessionalQuizletWizardStepLayout>
  );
};
