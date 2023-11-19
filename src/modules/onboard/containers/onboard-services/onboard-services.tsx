import { type FC } from 'react';
// components
import { ProfessionalQuizletWizardStepLayout } from '@/modules/user/components/professional-quizlet-wizard-step-layout';
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
import { ErrorBox } from '@/modules/core/components/error-box';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
// hooks
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

export const OnboardServices: FC<ProOnboardStepProps> = ({ next, back }) => {
  const {
    groups,
    setGroups,
    isGroupsLoading,
    isGroupsLoadingError,
    save,
    isSaveLoading,
    isSaveDisabled,
  } = useServiceOnProfessionalGroups({
    onSaved: next,
  });

  return (
    <ProfessionalQuizletWizardStepLayout
      meta={{
        title: 'Services',
        description: 'todo...',
      }}
      nextButtonProps={{
        isLoading: isSaveLoading,
        disabled: isSaveDisabled,
        onClick: save,
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <Placeholder
        isActive={isGroupsLoading}
        placeholder={<Spinner size='medium' />}
      >
        <Placeholder
          isActive={isGroupsLoadingError}
          placeholder={
            <ErrorBox
              title='Connection with server has been interrupted'
              description='Please check your internet connection or try refreshing the page. If the issue persists, please contact our support team for assistance.'
            />
          }
        >
          <ProfessionalServicesForm
            serviceOnProfessionalGroups={groups}
            setServiceOnProfessionalGroups={setGroups}
          />
        </Placeholder>
      </Placeholder>
    </ProfessionalQuizletWizardStepLayout>
  );
};
