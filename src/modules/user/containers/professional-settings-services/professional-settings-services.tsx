import { type FC } from 'react';

import { useIntl } from 'react-intl';

import { ErrorBox } from '@/modules/core/components/error-box';
import { Placeholder } from '@/modules/core/components/placeholder';
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';

export const ProfessionalSettingsServices: FC = () => {
  const intl = useIntl();

  const { groups, setGroups, isGroupsLoading, isGroupsLoadingError } =
    useServiceOnProfessionalGroups();

  return (
    <ProfileSettingsTabContentLayout
      title={'professional.settings.services.title'}
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
