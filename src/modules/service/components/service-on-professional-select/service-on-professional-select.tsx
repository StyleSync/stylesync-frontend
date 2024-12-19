import { type FC, useCallback, useMemo } from 'react';

import { RadioButton } from '@/modules/core/components/radio-button';
import { BaseCardWithRadioButton } from '@/modules/booking/components/booking-card-radio-button';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './service-on-professional-select.module.scss';
import { type ServiceOnProfessionalSelectProps } from '@/modules/service/components/service-on-professional-select/service-on-professional-select.interface';
import type { ServiceOnProfessionalListItem } from '@/modules/service/types/service.types';

export const ServiceOnProfessionalSelect: FC<
  ServiceOnProfessionalSelectProps
> = ({ value, onChange, professional }) => {
  const {
    data: serviceListQuery,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = trpc.serviceOnProfessional.list.useInfiniteQuery(
    {
      limit: 10,
      offset: 0,
      professionalId: professional?.id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const serviceList = useMemo<ServiceOnProfessionalListItem[] | []>(() => {
    return serviceListQuery?.pages.map((page) => page.items).flat() || [];
  }, [serviceListQuery]);

  const handleChange = useCallback(
    (id: string) => {
      const serviceOnProfessional = serviceList?.find((item) => item.id === id);

      if (serviceOnProfessional) {
        onChange(serviceOnProfessional);
      }
    },
    [serviceList, onChange]
  );

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <RadioButton.Group
          value={value?.id || null}
          onChange={handleChange}
          name='cards'
        >
          <div className={styles.baseCardContainer}>
            {serviceList?.map((service) => (
              <BaseCardWithRadioButton
                key={service.id}
                value={service.id}
                serviceOnProfessional={service}
              />
            ))}
            <InfinityListController
              hasNextPage={hasNextPage || false}
              onLoadMore={fetchNextPage}
              isNextPageLoading={isFetchingNextPage}
            />
          </div>
        </RadioButton.Group>
      </div>
    </div>
  );
};
