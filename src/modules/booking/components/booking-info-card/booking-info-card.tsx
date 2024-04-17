import { type FC, useRef } from 'react';
import { format } from 'date-fns';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';

import type { BookingInfoCardProps } from './booking-info-card.interface';

import styles from './booking-info-card.module.scss';

export const BookingInfoCard: FC<BookingInfoCardProps> = ({
  name,
  date,
  endTime,
  startTime,
  serviceName,
  variant = 'light',
}) => {
  // state
  const isOpen = useBoolean();
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  const startDate = new Date(startTime);

  const endDate = new Date(endTime);

  // Format start and end dates separately
  const formattedStartTime = format(startDate, 'HH:mm');
  const formattedEndTime = format(endDate, 'HH:mm');

  const formattedDate = format(new Date(date), `EEEE, d MMM`);

  useRipple(rootRef);

  return (
    <>
      <div
        tabIndex={0}
        className={clsx(styles.root, 'focusable', styles[variant])}
        onClick={isOpen.setTrue}
        ref={rootRef}
      >
        <div className={styles.container}>
          <Avatar className={styles.avatar} />
          <div className={styles.info}>
            <Typography className={styles.datetime} variant='body1'>
              {formattedDate}, {formattedStartTime} - {formattedEndTime}
            </Typography>
            <Typography className={styles.description} variant='small'>
              {name}, {serviceName}
            </Typography>
          </div>
        </div>
      </div>
      <BookingInfoDialog isOpen={isOpen.value} onOpenChange={isOpen.setValue} />
    </>
  );
};
