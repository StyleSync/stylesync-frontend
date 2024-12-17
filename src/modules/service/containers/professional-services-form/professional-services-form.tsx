import { type FC, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

// components
import { ServiceSelect } from '@/modules/service/components/service-select';
import { Placeholder } from '@/modules/core/components/placeholder';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
// containers
import { ServiceConstructorTable } from '@/modules/service/containers/service-constructor-table';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { sortServiceOnProfessionalGroups } from '@/modules/service/utils/service.utils';
// types
import type { Service } from '@prisma/client';

import type { ProfessionalServicesFormProps } from './professional-services-form.interface';
import styles from './professional-services-form.module.scss';

export const ProfessionalServicesForm: FC<ProfessionalServicesFormProps> = ({
  serviceOnProfessionalGroups,
  setServiceOnProfessionalGroups,
}) => {
  const intl = useIntl();
  const { data: serviceListQuery, ...serviceListData } =
    trpc.service.list.useInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const serviceList =
    serviceListQuery?.pages.map((page) => page.items).flat() || [];
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
      <ServiceSelect
        services={serviceList ?? []}
        onServiceSelect={handleServiceSelect}
        blackList={sortedServiceOnProfessionalGroups.map(
          (group) => group.service.id
        )}
        isLoading={serviceListData.isLoading}
      />

      <InfinityListController
        hasNextPage={serviceListData.hasNextPage || false}
        onLoadMore={serviceListData.fetchNextPage}
        isNextPageLoading={serviceListData.isFetchingNextPage}
      />

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
