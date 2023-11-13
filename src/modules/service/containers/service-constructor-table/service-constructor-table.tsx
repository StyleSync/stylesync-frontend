import { type FC, useCallback } from 'react';
import { v4 } from 'uuid';
// components
import { Button } from '@/modules/core/components/button';
import { ServiceTag } from '@/modules/service/components/service-tag';
// containers
import { ServiceConstructorRow } from '@/modules/service/containers/service-constructor-row';
// types
import type {
  ServiceOnProfessional,
  ServiceOnProfessionalEditableFields,
} from '@/modules/service/types/service.types';

import type { ServiceConstructorTableProps } from './service-constructor-table.interface';
import styles from './service-constructor-table.module.scss';

export const ServiceConstructorTable: FC<ServiceConstructorTableProps> = ({
  service,
  serviceOnProfessionalList,
  onChange,
  onRemoveClick,
}) => {
  const handleAddClick = useCallback(() => {
    onChange(service, [
      ...serviceOnProfessionalList,
      {
        service,
        id: `new__${v4()}`,
        title: '',
        duration: 0,
        price: 0,
        currency: 'USD',
      },
    ]);
  }, [service, serviceOnProfessionalList, onChange]);

  const handleTableRemoveClick = useCallback(() => {
    onRemoveClick(service);
  }, [service, onRemoveClick]);

  const handleRowRemove = useCallback(
    (id: string) => {
      onChange(
        service,
        serviceOnProfessionalList.filter((item) => item.id !== id)
      );
    },
    [service, serviceOnProfessionalList, onChange]
  );

  const handleRowChange = useCallback(
    (id: string) => (edited: ServiceOnProfessionalEditableFields) => {
      const serviceOnProfessional = serviceOnProfessionalList.find(
        (item) => item.id === id
      );

      const data: ServiceOnProfessional = serviceOnProfessional
        ? { ...serviceOnProfessional, ...edited }
        : {
            ...edited,
            id: v4(),
            service,
          };

      onChange(service, [
        ...serviceOnProfessionalList.filter((item) => item.id !== id),
        data,
      ]);
    },
    [service, serviceOnProfessionalList, onChange]
  );

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <ServiceTag data={service} />
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
      {serviceOnProfessionalList.map((serviceOnProfessional) => (
        <ServiceConstructorRow
          key={serviceOnProfessional.id}
          data={serviceOnProfessional}
          onChange={handleRowChange(serviceOnProfessional.id)}
          onDelete={handleRowRemove}
        />
      ))}
    </div>
  );
};
