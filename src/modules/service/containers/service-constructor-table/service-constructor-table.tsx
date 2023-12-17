import { type FC, useCallback } from 'react';
import { v4 } from 'uuid';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
// components
import { Button } from '@/modules/core/components/button';
import { Tag } from '../../../core/components/tag';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
// containers
import { ServiceConstructorRow } from '@/modules/service/containers/service-constructor-row';
// types
import type {
  ServiceOnProfessional,
  ServiceOnProfessionalEditableFields,
} from '@/modules/service/types/service.types';
import type { IconName } from '@/modules/core/components/icon';

import type { ServiceConstructorTableProps } from './service-constructor-table.interface';
import styles from './service-constructor-table.module.scss';

export const ServiceConstructorTable: FC<ServiceConstructorTableProps> = ({
  service,
  serviceOnProfessionalList,
  onChange,
  onRemoveClick,
}) => {
  const intl = useIntl();
  // state
  const isActionsOpen = useBoolean();

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
        <Tag
          icon={service.icon as IconName}
          text={intl.formatMessage({ id: service.name })}
        />
        <div className={styles.actions}>
          <Button
            icon='plus'
            variant='outlined'
            type='button'
            onClick={handleAddClick}
          />
          <Button
            className={styles.remove}
            icon='trash'
            variant='danger'
            type='button'
            onClick={handleTableRemoveClick}
          />
        </div>
        <DropdownMenu
          isOpen={isActionsOpen.value}
          onClose={isActionsOpen.setFalse}
          trigger={
            <Button
              onClick={isActionsOpen.setTrue}
              className={clsx(styles.more, {
                [styles.active]: isActionsOpen.value,
              })}
              variant='secondary'
              icon='points'
            />
          }
          items={[
            {
              id: 'add',
              variant: 'primary',
              icon: 'plus',
              text: 'Add service',
            },
            {
              id: 'delete',
              variant: 'danger',
              icon: 'trash',
              text: 'Delete group',
            },
          ]}
          popoverProps={{
            align: 'end',
          }}
        />
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
