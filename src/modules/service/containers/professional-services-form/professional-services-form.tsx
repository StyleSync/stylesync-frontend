import { type FC, useCallback, useMemo, useState } from 'react';
import { v4 } from 'uuid';

import type { Service } from '@prisma/client';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { Placeholder } from '@/modules/core/components/placeholder';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ServiceSelect } from '@/modules/service/components/service-select';
import { ServiceConstructorTable } from '@/modules/service/containers/service-constructor-table';
import { sortServiceOnProfessionalGroups } from '@/modules/service/utils/service.utils';
import { ServiceOnProfessionalEditForm } from '@/modules/service/components/service-on-professional-edit-form';
import type { ProfessionalServicesFormProps } from './professional-services-form.interface';

import styles from './professional-services-form.module.scss';

export const ProfessionalServicesForm: FC<ProfessionalServicesFormProps> = ({
  serviceOnProfessionalGroups,
  setServiceOnProfessionalGroups,
}) => {
  const intl = useIntl();
  const isCreateServiceOpen = useBoolean();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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
      setSelectedService(service);
      isCreateServiceOpen.setTrue();
    },
    [isCreateServiceOpen]
  );

  const handleServiceRemove = useCallback(
    (service: Service) => {
      setServiceOnProfessionalGroups((prev) =>
        prev.filter((item) => item.service.id !== service.id)
      );
    },
    [setServiceOnProfessionalGroups]
  );

  const handleCreateFormClose = useCallback(() => {
    isCreateServiceOpen.setFalse();
    setSelectedService(null);
  }, [isCreateServiceOpen]);

  return (
    <div className={styles.root}>
      <ServiceSelect
        services={serviceList ?? []}
        onServiceSelect={handleServiceSelect}
        blackList={[]}
        isLoading={serviceListData.isPending}
      />
      {selectedService && (
        <ServiceOnProfessionalEditForm
          data={{
            service: selectedService,
            id: `new__${v4()}`,
            title: '',
            duration: 0,
            price: 0,
            currency: 'UAH',
            description: '',
            position: serviceList.length,
          }}
          isActive={isCreateServiceOpen.value}
          onOpenChange={handleCreateFormClose}
        />
      )}

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
