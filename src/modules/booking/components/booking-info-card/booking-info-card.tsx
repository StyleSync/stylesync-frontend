import { type FC, useRef } from 'react';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
// hooks
import { useRipple } from '@/modules/core/hooks/use-ripple';
// utils
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import type { BookingInfoCardProps } from './booking-info-card.interface';

import styles from './booking-info-card.module.scss';

export const BookingInfoCard: FC<BookingInfoCardProps> = ({
  name,
  date,
  endTime,
  startTime,
  serviceName,
  variant = 'light',
  email,
  phone,
  comment,
}) => {
  const intl = useIntl();
  // state
  const isOpen = useBoolean();
  // refs
  const rootRef = useRef<HTMLDivElement>(null);
  const startDate = new Date(startTime);

  const endDate = new Date(endTime);

  // Format start and end dates separately
  const formattedStartTime = formatI18n(startDate, 'HH:mm', intl.locale);
  const formattedEndTime = formatI18n(endDate, 'HH:mm', intl.locale);

  const formattedDate = formatI18n(new Date(date), 'EEEE, d MMM', intl.locale);

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
          {/* <Avatar className={styles.avatar} /> */}
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
      <BookingInfoDialog
        phone={phone}
        startTime={formattedStartTime}
        startDate={formattedDate}
        email={email}
        serviceName={serviceName}
        name={name}
        isOpen={isOpen.value}
        onOpenChange={isOpen.setValue}
        comment={comment}
      />
    </>
  );
};
