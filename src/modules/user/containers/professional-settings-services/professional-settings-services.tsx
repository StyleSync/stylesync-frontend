import { type FC } from 'react';
import { useIntl } from 'react-intl';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { Placeholder } from '@/modules/core/components/placeholder';
import { ErrorBox } from '@/modules/core/components/error-box';
// containers
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
// hooks
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';

export const ProfessionalSettingsServices: FC = () => {
  const intl = useIntl();

  const { groups, setGroups, isGroupsLoading, isGroupsLoadingError } =
    useServiceOnProfessionalGroups();

  return (
    <ProfileSettingsTabContentLayout
      title={intl.formatMessage({ id: 'professional.settings.services.title' })}
      icon='beauty-service'
      isLoading={isGroupsLoading}
      hideActions={isGroupsLoading || isGroupsLoadingError}
    >
      <Placeholder
        isActive={isGroupsLoadingError}
        placeholder={
          <ErrorBox
            title={intl.formatMessage({
              id: 'professional.settings.services.errorBox.title',
            })}
            description={intl.formatMessage({
              id: 'professional.settings.services.errorBox.description',
            })}
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
