import { type FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { v4 } from 'uuid';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
import { Tag } from '@/modules/core/components/tag';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
// containers
import { ServiceConstructorRow } from '@/modules/service/containers/service-constructor-row';
import { ServiceOnProfessionalEditForm } from '@/modules/service/components/service-on-professional-edit-form';
// hooks
import { useServiceOnProfessionalGroupDelete } from '@/modules/service/hooks/use-service-on-professional-group-delete';
import { useBoolean } from 'usehooks-ts';
// types
import type { IconName } from '@/modules/core/components/icon';
// utils
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { ServiceConstructorTableProps } from './service-constructor-table.interface';
import styles from './service-constructor-table.module.scss';

export const ServiceConstructorTable: FC<ServiceConstructorTableProps> = ({
  service,
  serviceOnProfessionalList,
  onRemove,
}) => {
  const queryClient = useQueryClient();
  const intl = useIntl();
  // state
  const isActionsOpen = useBoolean();
  const isCreateOpen = useBoolean();
  // queries
  const serviceOnProfessionalGroupDelete =
    useServiceOnProfessionalGroupDelete();

  const handleTableRemoveClick = useCallback(() => {
    serviceOnProfessionalGroupDelete.mutate(
      serviceOnProfessionalList.map((item) => item.id),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.serviceOnProfessional.list),
          });
          onRemove(service);
        },
        onError: () => {
          showToast({
            variant: 'error',
            title: 'Unable to delete',
            description: '',
          });
        },
      }
    );
  }, [
    queryClient,
    service,
    serviceOnProfessionalGroupDelete,
    serviceOnProfessionalList,
    onRemove,
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Tag
          icon={service.icon as IconName}
          text={intl.formatMessage({ id: service.name })}
        />
        <div className={styles.actions}>
          <Button
            aria-label='Add service group'
            icon='plus'
            variant='outlined'
            type='button'
            onClick={isCreateOpen.setTrue}
          />
          <Button
            aria-label='Delete service group'
            className={styles.remove}
            icon='trash'
            variant='danger'
            type='button'
            isLoading={serviceOnProfessionalGroupDelete.isLoading}
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
        />
      ))}
      <ServiceOnProfessionalEditForm
        data={{
          service,
          id: `new__${v4()}`,
          title: '',
          duration: 0,
          price: 0,
          currency: 'USD',
          description: '',
        }}
        isActive={isCreateOpen.value}
        onOpenChange={isCreateOpen.setFalse}
      />
    </div>
  );
};
