import { type FC, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceOnProfessionalEditForm } from '@/modules/service/components/service-on-professional-edit-form';
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
import { formatDuration } from '@/modules/core/utils/time.utils';
import { useIntl } from 'react-intl';

export const ServiceConstructorRow: FC<ServiceConstructorRowProps> = ({
  data,
}) => {
  const queryClient = useQueryClient();
  const deviceType = useDeviceType();
  const intl = useIntl();
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

  console.log(data.duration);

  return (
    <div
      className={clsx(styles.root, {
        'opacity-[0.7]': serviceOnProfessionalDeleteMutation.isLoading,
      })}
      ref={rootRef}
    >
      <div className={styles.display}>
        <div className={styles.info}>
          <Typography variant='body1'>{data.title}</Typography>
          <Typography variant='small' className={styles.secondaryText}>
            {formatDuration(data.duration, intl)}
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
            className='z-50'
            aria-label='Delete service'
            icon='trash'
            variant='danger'
            isLoading={serviceOnProfessionalDeleteMutation.isLoading}
            onClick={handleDelete}
          />
        </div>
      </div>
      <ServiceOnProfessionalEditForm
        data={data}
        isActive={isEdit.value}
        onOpenChange={isEdit.setValue}
      />
    </div>
  );
};
