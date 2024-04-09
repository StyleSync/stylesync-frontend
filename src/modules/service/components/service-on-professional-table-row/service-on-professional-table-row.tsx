import React, { type FC, useRef } from 'react';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
// containers
import { CreateBooking } from '@/modules/booking/containers/create-booking-container';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useRipple } from '@/modules/core/hooks/use-ripple';
// utils
import { formatMinutesDuration } from '@/modules/core/utils/time.utils';
// type
import type { ServiceOnProfessionalTableRowProps } from './service-on-professional-table-row.interface';
import styles from './service-on-professional-table-row.module.scss';

export const ServiceOnProfessionalTableRow: FC<
  ServiceOnProfessionalTableRowProps
> = ({ data, session, professional }) => {
  const deviceType = useDeviceType();
  // refs
  const rootRef = useRef<HTMLDivElement>(null);

  useRipple(rootRef, {
    disabled: deviceType !== 'mobile',
  });

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={clsx(styles.cell, styles.vertical, styles.flex75)}>
        <Typography className={styles.title} variant='body1'>
          {data.title}
        </Typography>
        <Typography className={styles.duration} variant='small'>
          {formatMinutesDuration(data.duration)}
        </Typography>
      </div>
      <div className={clsx(styles.cell, styles.flex25)}>
        <Typography className={styles.price} variant='body1'>
          {data.price} {data.currency}
        </Typography>
      </div>
      <div className={clsx(styles.cell, styles.fit)}>
        {professional.id !== session?.user?.id &&
          (deviceType === 'mobile' ? (
            <Icon
              className={styles.chevron}
              name='chevron-right'
              width={18}
              height={18}
            />
          ) : (
            <CreateBooking
              professional={professional}
              selectedService={data.id}
              btnVariant='outlined'
            />
          ))}
      </div>
    </div>
  );
};
