import { type FC, useCallback, useState } from 'react';
// components
import { ServiceSelect } from '@/modules/service/components';
import { Placeholder } from '@/modules/core/components';
// containers
import { ServiceConstructorTable } from '@/modules/service/containers/service-constructor-table';
// types
import type {
  ServiceData,
  ServiceGroup,
  SupportedServiceKey,
} from '@/modules/service/types/service.types';

import type { ProfessionalServicesFormProps } from './professional-services-form.interface';
import styles from './professional-services-form.module.scss';

export const ProfessionalServicesForm: FC<
  ProfessionalServicesFormProps
> = () => {
  const [serviceGroup, setServiceGroup] = useState<ServiceGroup>({});

  const handleServiceSelect = useCallback((serviceKey: SupportedServiceKey) => {
    setServiceGroup((current) => ({
      ...current,
      [serviceKey]: {
        services: [],
      },
    }));
  }, []);

  const handleServiceGroupChange = useCallback(
    (serviceKey: SupportedServiceKey, services: ServiceData[]) => {
      setServiceGroup((current) => ({
        ...current,
        [serviceKey]: {
          services,
        },
      }));
    },
    []
  );

  const handleServiceRemove = useCallback((serviceKey: SupportedServiceKey) => {
    setServiceGroup((current) => {
      const stateCopy = { ...current };

      if (serviceKey in stateCopy) {
        delete stateCopy[serviceKey];
      }

      return stateCopy;
    });
  }, []);

  return (
    <div className={styles.root}>
      <ServiceSelect
        onServiceSelect={handleServiceSelect}
        blackList={Object.keys(serviceGroup) as SupportedServiceKey[]}
      />

      <Placeholder
        isActive={Object.keys(serviceGroup).length === 0}
        placeholder={{
          illustration: 'folder',
          description: 'No services added',
        }}
        fadeIn
      >
        {Object.keys(serviceGroup).map((serviceKey) => (
          <ServiceConstructorTable
            key={serviceKey}
            serviceKey={serviceKey as SupportedServiceKey}
            services={
              serviceGroup[serviceKey as SupportedServiceKey]?.services ?? []
            }
            onChange={handleServiceGroupChange}
            onRemoveClick={handleServiceRemove}
          />
        ))}
      </Placeholder>
    </div>
  );
};
