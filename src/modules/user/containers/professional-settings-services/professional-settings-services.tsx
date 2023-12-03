import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { Placeholder } from '@/modules/core/components/placeholder';
import { ErrorBox } from '@/modules/core/components/error-box';
// containers
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
// hooks
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';
// utils
import { showToast } from '@/modules/core/providers/toast-provider';

export const ProfessionalSettingsServices: FC = () => {
  const {
    groups,
    setGroups,
    isGroupsLoading,
    isGroupsLoadingError,
    save,
    isSaveLoading,
    isSaveDisabled,
  } = useServiceOnProfessionalGroups({
    onSaved: () => {
      showToast({
        variant: 'success',
        title: 'All done!',
        description: 'Changes has been saved',
      });
    },
  });

  return (
    <ProfileSettingsTabContentLayout
      title='Services settings'
      icon='beauty-service'
      isLoading={isGroupsLoading}
      actions={[
        {
          text: 'Save',
          isLoading: isSaveLoading,
          disabled: isSaveDisabled,
          onClick: save,
        },
      ]}
      hideActions={isGroupsLoading || isGroupsLoadingError}
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
    </ProfileSettingsTabContentLayout>
  );
};
