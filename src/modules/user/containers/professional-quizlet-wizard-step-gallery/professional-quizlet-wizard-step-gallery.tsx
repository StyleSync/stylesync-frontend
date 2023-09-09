import { type FC } from 'react';
// components
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
// types
import type { ProfessionalQuizletWizardStepProps } from '@/modules/user/containers/professional-quizlet-wizard/professional-quizlet-wizard.interface';

export const ProfessionalQuizletWizardStepGallery: FC<
  ProfessionalQuizletWizardStepProps
> = ({ next, back }) => {
  return (
    <ProfessionalQuizletWizardStepLayout
      meta={{
        title: 'Gallery',
        description: 'todo...',
      }}
      nextButtonProps={{
        onClick: next,
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <ProfessionalGalleryForm />
    </ProfessionalQuizletWizardStepLayout>
  );
};
