import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { Placeholder } from '@/modules/core/components/placeholder';
import { ErrorBox } from '@/modules/core/components/error-box';
// containers
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
// hooks
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';

export const ProfessionalSettingsServices: FC = () => {
  const { groups, setGroups, isGroupsLoading, isGroupsLoadingError } =
    useServiceOnProfessionalGroups();

  return (
    <ProfileSettingsTabContentLayout
      title='Services settings'
      icon='beauty-service'
      isLoading={isGroupsLoading}
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
