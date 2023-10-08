import { type FC, useCallback } from 'react';
import { v4 } from 'uuid';
// components
import { Button } from '@/modules/core/components/button';
import { ServiceTag } from '@/modules/service/components/service-tag';
// containers
import { ServiceConstructorRow } from '@/modules/service/containers/service-constructor-row';
// utils
import { Time } from '@/modules/core/utils/time.utils';

import type { ServiceConstructorTableProps } from './service-constructor-table.interface';
import styles from './service-constructor-table.module.scss';
import type { ServiceData } from '@/modules/service/types/service.types';

const defaultTime = new Time({ hours: 1, minutes: 0 });

export const ServiceConstructorTable: FC<ServiceConstructorTableProps> = ({
  serviceKey,
  services,
  onChange,
  onRemoveClick,
}) => {
  const handleAddClick = useCallback(() => {
    onChange(serviceKey, [
      ...services,
      {
        serviceKey,
        id: v4(),
        duration: defaultTime.getString(),
        title: '',
        price: {
          value: '0',
          currency: 'USD',
        },
      },
    ]);
  }, [serviceKey, services, onChange]);

  const handleTableRemoveClick = useCallback(() => {
    onRemoveClick(serviceKey);
  }, [serviceKey, onRemoveClick]);

  const handleRowRemove = useCallback(
    (id: string) => {
      onChange(
        serviceKey,
        services.filter((service) => service.id !== id)
      );
    },
    [onChange, serviceKey, services]
  );

  const handleRowChange = useCallback(
    (service: ServiceData) => {
      const res = [
        ...services.filter((_service) => _service.id !== service.id),
        { ...service },
      ];

      onChange(serviceKey, res);
    },
    [onChange, serviceKey, services]
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <ServiceTag service={serviceKey} />
        <div className={styles.actions}>
          <Button
            icon='plus'
            variant='outlined'
            type='button'
            onClick={handleAddClick}
          />
          <Button
            icon='trash'
            variant='danger'
            type='button'
            className={styles.remove}
            onClick={handleTableRemoveClick}
          />
        </div>
      </div>
      {services.map((service) => (
        <ServiceConstructorRow
          key={service.id}
          data={service}
          onChange={handleRowChange}
          onDelete={handleRowRemove}
        />
      ))}
    </div>
  );
};
