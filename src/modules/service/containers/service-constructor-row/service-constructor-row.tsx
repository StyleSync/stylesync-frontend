import { type FC, useCallback, useRef } from 'react';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceOnProfessionalEditForm } from '@/modules/service/components/service-on-professional-edit-form';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';
import { useBoolean } from 'usehooks-ts';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// types
import type { ServiceOnProfessionalEditableFields } from '@/modules/service/types/service.types';

import type { ServiceConstructorRowProps } from './service-constructor-row.interface';
import styles from './service-constructor-row.module.scss';
import { isServiceOnProfessionalValid } from '@/modules/service/utils/service.utils';
import { Icon } from '@/modules/core/components/icon';

export const ServiceConstructorRow: FC<ServiceConstructorRowProps> = ({
  data,
  onChange,
  onDelete,
}) => {
  const deviceType = useDeviceType();
  // state
  const isEdit = useBoolean(!isServiceOnProfessionalValid(data));
  // refs
  const rootRef = useRef<HTMLDivElement>(null);

  useRipple(rootRef, {
    disabled: isEdit.value || deviceType !== 'mobile',
  });

  const handleDelete = useCallback(() => {
    onDelete(data.id);
  }, [data.id, onDelete]);

  const handleSubmit = useCallback(
    (values: ServiceOnProfessionalEditableFields) => {
      isEdit.setFalse();
      onChange(values);
    },
    [onChange, isEdit]
  );

  const handleRowClick = useCallback(() => {
    if (deviceType === 'mobile') {
      isEdit.setTrue();
    }
  }, [deviceType, isEdit.setTrue]);

  return (
    <div className={styles.root} ref={rootRef}>
      {/* always display row on mobile and if !isEdit on tablet & desktop */}
      {(!isEdit.value || deviceType === 'mobile') && (
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
            <Button icon='pencil' variant='outlined' onClick={isEdit.setTrue} />
            <Button icon='trash' variant='danger' onClick={handleDelete} />
          </div>
          <Icon
            className={styles.chevron}
            name='chevron-right'
            width={18}
            height={18}
          />
        </div>
      )}
      <ServiceOnProfessionalEditForm
        isActive={isEdit.value}
        data={data}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        onCancel={isEdit.setFalse}
      />
    </div>
  );
};
