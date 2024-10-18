import { type FC, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { Placeholder } from '@/modules/core/components/placeholder';
import { ErrorBox } from '@/modules/core/components/error-box';
import { ServiceSelect } from '@/modules/service/components/service-select';
// containers
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
// hooks
import { useServiceOnProfessionalGroups } from '@/modules/service/hooks/use-service-on-professional-groups';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { sortServiceOnProfessionalGroups } from '@/modules/service/utils/service.utils';
// type
import type { Service } from '@prisma/client';

export const ProfessionalSettingsServices: FC = () => {
  const intl = useIntl();

  const { data: serviceList, ...serviceListQuery } =
    trpc.service.list.useQuery();

  const { groups, setGroups, isGroupsLoading, isGroupsLoadingError } =
    useServiceOnProfessionalGroups();

  // memo
  const sortedServiceOnProfessionalGroups = useMemo(
    () => sortServiceOnProfessionalGroups(groups),
    [groups]
  );

  const handleServiceSelect = useCallback(
    (service: Service) => {
      setGroups((prev) => [
        ...prev,
        { service, serviceOnProfessionalList: [] },
      ]);
    },
    [setGroups]
  );

  return (
    <ProfileSettingsTabContentLayout
      title={intl.formatMessage({ id: 'professional.settings.services.title' })}
      icon='beauty-service'
      isLoading={isGroupsLoading}
      hideActions={isGroupsLoading || isGroupsLoadingError}
      actions={[
        {
          actionNode: (
            <ServiceSelect
              services={serviceList ?? []}
              onServiceSelect={handleServiceSelect}
              blackList={sortedServiceOnProfessionalGroups.map(
                (group) => group.service.id
              )}
              isLoading={serviceListQuery.isLoading}
            />
          ),
          isMobile: true,
        },
      ]}
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
