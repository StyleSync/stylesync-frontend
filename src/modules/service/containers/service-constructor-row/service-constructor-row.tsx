import { type FC, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceOnProfessionalEditForm } from '@/modules/service/components/service-on-professional-edit-form';
import { Icon } from '@/modules/core/components/icon';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';
import { useBoolean } from 'usehooks-ts';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { isServiceOnProfessionalValid } from '@/modules/service/utils/service.utils';
// types
import type { ServiceConstructorRowProps } from './service-constructor-row.interface';
import styles from './service-constructor-row.module.scss';

export const ServiceConstructorRow: FC<ServiceConstructorRowProps> = ({
  data,
}) => {
  const queryClient = useQueryClient();
  const deviceType = useDeviceType();
  // state
  const isEdit = useBoolean(!isServiceOnProfessionalValid(data));
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  // queries
  const serviceOnProfessionalDeleteMutation =
    trpc.serviceOnProfessional.delete.useMutation();

  useRipple(rootRef, {
    disabled: isEdit.value || deviceType !== 'mobile',
  });

  const handleDelete = useCallback(() => {
    serviceOnProfessionalDeleteMutation.mutate(
      { id: data.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.serviceOnProfessional.list),
          });
        },
      }
    );
  }, [data.id, serviceOnProfessionalDeleteMutation]);

  const handleRowClick = useCallback(() => {
    if (deviceType === 'mobile') {
      isEdit.setTrue();
    }
  }, [deviceType, isEdit.setTrue]);

  return (
    <div
      className={clsx(styles.root, {
        'opacity-[0.7]': serviceOnProfessionalDeleteMutation.isLoading,
      })}
      ref={rootRef}
    >
      <div className={styles.display} onClick={handleRowClick}>
        <div className={styles.info}>
          <Typography variant='body1'>{data.title}</Typography>
          <Typography variant='small' className={styles.secondaryText}>
            {data.duration}
          </Typography>
        </div>
        <div className={styles.price}>
          <Typography variant='body1'>
            {data.price} {data.currency}
          </Typography>
        </div>
        <div className={styles.actions}>
          <Button
            aria-label='Edit service'
            icon='pencil'
            disabled={serviceOnProfessionalDeleteMutation.isLoading}
            variant='outlined'
            onClick={isEdit.setTrue}
          />
          <Button
            aria-label='Delete service'
            icon='trash'
            variant='danger'
            isLoading={serviceOnProfessionalDeleteMutation.isLoading}
            onClick={handleDelete}
          />
        </div>
        <Icon
          className={styles.chevron}
          name='chevron-right'
          width={18}
          height={18}
        />
      </div>
      <ServiceOnProfessionalEditForm
        data={data}
        isActive={isEdit.value}
        onOpenChange={isEdit.setValue}
      />
    </div>
  );
};
