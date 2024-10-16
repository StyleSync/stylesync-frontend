import { type FC, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

// components
import { ServiceSelect } from '@/modules/service/components/service-select';
import { Placeholder } from '@/modules/core/components/placeholder';
// containers
import { ServiceConstructorTable } from '@/modules/service/containers/service-constructor-table';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { sortServiceOnProfessionalGroups } from '@/modules/service/utils/service.utils';
// types
import type { Service } from '@prisma/client';

import type { ProfessionalServicesFormProps } from './professional-services-form.interface';
import styles from './professional-services-form.module.scss';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

export const ProfessionalServicesForm: FC<ProfessionalServicesFormProps> = ({
  serviceOnProfessionalGroups,
  setServiceOnProfessionalGroups,
}) => {
  const deviceType = useDeviceType();

  const intl = useIntl();
  const { data: serviceList, ...serviceListQuery } =
    trpc.service.list.useQuery();
  // memo
  const sortedServiceOnProfessionalGroups = useMemo(
    () => sortServiceOnProfessionalGroups(serviceOnProfessionalGroups),
    [serviceOnProfessionalGroups]
  );

  const handleServiceSelect = useCallback(
    (service: Service) => {
      setServiceOnProfessionalGroups((prev) => [
        ...prev,
        { service, serviceOnProfessionalList: [] },
      ]);
    },
    [setServiceOnProfessionalGroups]
  );

  const handleServiceRemove = useCallback(
    (service: Service) => {
      setServiceOnProfessionalGroups((prev) =>
        prev.filter((item) => item.service.id !== service.id)
      );
    },
    [setServiceOnProfessionalGroups]
  );

  return (
    <div className={styles.root}>
      {deviceType !== 'mobile' && (
        <ServiceSelect
          services={serviceList ?? []}
          onServiceSelect={handleServiceSelect}
          blackList={sortedServiceOnProfessionalGroups.map(
            (group) => group.service.id
          )}
          isLoading={serviceListQuery.isLoading}
        />
      )}
      <Placeholder
        isActive={sortedServiceOnProfessionalGroups.length === 0}
        placeholder={{
          illustration: 'folder',
          description: intl.formatMessage({
            id: 'professional.service.description',
          }),
        }}
        fadeIn
      >
        {sortedServiceOnProfessionalGroups.map((group) => (
          <ServiceConstructorTable
            key={group.service.id}
            {...group}
            onRemove={handleServiceRemove}
          />
        ))}
      </Placeholder>
    </div>
  );
};
