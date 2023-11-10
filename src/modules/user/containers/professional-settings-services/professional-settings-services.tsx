import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { Spinner } from '@/modules/core/components/spinner';
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
        description: 'Your changes has been saved',
      });
    },
  });

  return (
    <ProfileSettingsTabContentLayout
      title='Services settings'
      icon='beauty-service'
      actions={[
        {
          text: 'Save',
          isLoading: isSaveLoading,
          disabled: isSaveDisabled,
          onClick: save,
        },
      ]}
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
    </ProfileSettingsTabContentLayout>
  );
};
