import { type FC, useCallback, useId } from 'react';
import { useBoolean } from 'usehooks-ts';
// components
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
// types
import type { ProfessionalQuizletWizardStepProps } from '@/modules/user/containers/professional-quizlet-wizard/professional-quizlet-wizard.interface';

import type { AboutProfessionalFormValues } from '@/modules/user/components/about-professional-form/about-professional-form.interface';

export const ProfessionalQuizletWizardStepAbout: FC<
  ProfessionalQuizletWizardStepProps
> = ({ next }) => {
  const formId = useId();
  const isLoading = useBoolean();

  const handleSubmit = useCallback(
    async (data: AboutProfessionalFormValues & { avatar: File | null }) => {
      isLoading.setTrue();

      const QUERY_DELAY = 2000;

      await new Promise((res) => {
        setTimeout(() => {
          res(data);
        }, QUERY_DELAY);
      });
      isLoading.setFalse();

      next();
    },
    [isLoading, next]
  );

  return (
    <ProfessionalQuizletWizardStepLayout
      meta={{
        title: 'About',
        description:
          'We will use this information to create a detailed account of your experience that can be shared with your clients',
      }}
      nextButtonProps={{
        form: formId,
        isLoading: isLoading.value,
      }}
    >
      <AboutProfessionalForm formId={formId} onSubmit={handleSubmit} />
    </ProfessionalQuizletWizardStepLayout>
  );
};
