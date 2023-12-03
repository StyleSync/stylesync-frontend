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

import GirlImage from '@/assets/images/girl.png';

import type { BookingInfoCardProps } from './booking-info-card.interface';

import styles from './booking-info-card.module.scss';

export const BookingInfoCard: FC<BookingInfoCardProps> = ({
  name,
  date,
  serviceName,
  variant = 'light',
}) => {
  // state
  const isOpen = useBoolean();
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  const startDate = new Date(date); // Start date

  const endDate = new Date(date); // Final date

  // Add 1 hour
  endDate.setHours(endDate.getHours() + 1);

  // Format start and end dates separately
  const formattedStartDate = format(startDate, 'HH:mm');

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
          <Avatar className={styles.avatar} url={GirlImage.src} />
          <div className={styles.info}>
            <Typography className={styles.datetime} variant='body1'>
              {formattedDate} at {formattedStartDate}
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
