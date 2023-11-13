import { type FC, useCallback, useMemo } from 'react';
// components
import { ServiceSelect } from '@/modules/service/components/service-select';
import { Placeholder } from '@/modules/core/components/placeholder';
// containers
import { ServiceConstructorTable } from '@/modules/service/containers/service-constructor-table';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
import type {
  ServiceOnProfessional,
  ServiceOnProfessionalGroup,
} from '@/modules/service/types/service.types';
import type { Service } from '@prisma/client';

import type { ProfessionalServicesFormProps } from './professional-services-form.interface';
import styles from './professional-services-form.module.scss';

const alphabetCompare = (a: string, b: string) => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};

export const ProfessionalServicesForm: FC<ProfessionalServicesFormProps> = ({
  serviceOnProfessionalGroups,
  setServiceOnProfessionalGroups,
}) => {
  const { data: serviceList, ...serviceListQuery } =
    trpc.service.list.useQuery();
  // memo
  const sortedServiceOnProfessionalGroups = useMemo(() => {
    // todo: might be downgrade performance
    const next: ServiceOnProfessionalGroup[] = [...serviceOnProfessionalGroups];

    next.sort((group1, group2) =>
      alphabetCompare(group1.service.name, group2.service.name)
    );

    next.forEach((group) => {
      group.serviceOnProfessionalList.sort((s1, s2) =>
        alphabetCompare(s1.title, s2.title)
      );
    });

    return next;
  }, [serviceOnProfessionalGroups]);

  const handleServiceSelect = useCallback(
    (service: Service) => {
      setServiceOnProfessionalGroups((prev) => [
        ...prev,
        { service, serviceOnProfessionalList: [] },
      ]);
    },
    [setServiceOnProfessionalGroups]
  );

  const handleServiceGroupChange = useCallback(
    (service: Service, serviceOnProfessionalList: ServiceOnProfessional[]) => {
      setServiceOnProfessionalGroups((prev) => {
        return [
          ...prev.filter((item) => item.service.id !== service.id),
          {
            service,
            serviceOnProfessionalList,
          },
        ];
      });
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
        isLoading={serviceListQuery.isLoading}
      />
      <Placeholder
        isActive={sortedServiceOnProfessionalGroups.length === 0}
        placeholder={{
          illustration: 'folder',
          description: 'No services added',
        }}
        fadeIn
      >
        {sortedServiceOnProfessionalGroups.map((group) => (
          <ServiceConstructorTable
            key={group.service.id}
            {...group}
            onChange={handleServiceGroupChange}
            onRemoveClick={handleServiceRemove}
          />
        ))}
      </Placeholder>
    </div>
  );
};
