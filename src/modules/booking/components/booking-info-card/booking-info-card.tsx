import { type FC } from 'react';
import { format } from 'date-fns';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
// hooks
import { useBoolean } from 'usehooks-ts';

import GirlImage from '@/assets/images/girl.png';

import type { BookingInfoCardProps } from './booking-info-card.interface';

import styles from './booking-info-card.module.scss';
import clsx from 'clsx';

export const BookingInfoCard: FC<BookingInfoCardProps> = ({
  name,
  date,
  serviceName,
  variant = 'light',
}) => {
  const startDate = new Date(date); // Start date

  const endDate = new Date(date); // Final date

  // Add 1 hour
  endDate.setHours(endDate.getHours() + 1);

  // Format start and end dates separately
  const formattedStartDate = format(startDate, 'HH:mm');
  const formattedEndDate = format(endDate, 'HH:mm');

  const formattedDateRange = `${formattedStartDate}–${formattedEndDate}`;

  const formattedDate = format(
    new Date(date),
    `EEEE, d MMMM, ${formattedDateRange}`
  );
  // hooks
  const isOpen = useBoolean();

  return (
    <div className={clsx(styles.root, styles[variant])}>
      <div className={styles.container}>
        <Avatar className={styles.avatar} url={GirlImage.src} />
        <div className={styles.info}>
          <Typography
            className={styles.datetime}
            variant='body1'
            weight='medium'
          >
            {formattedDate}
          </Typography>
          <Typography
            className={styles.description}
            variant='body2'
            weight='medium'
          >
            {name}, {serviceName}
          </Typography>
        </div>
      </div>
      <DropdownMenu
        items={[
          {
            id: 'profile',
            text: 'Profile',
            icon: 'user',
          },
          {
            id: 'reschedule',
            text: 'Reschedule',
            icon: 'time',
          },
          {
            id: 'cancel',
            text: 'Cancel',
            icon: 'close',
            variant: 'danger',
          },
        ]}
        trigger={
          <Button
            className={clsx(styles.moreButton, {
              [styles.active]: isOpen.value,
            })}
            onClick={isOpen.toggle}
            icon='points'
            variant='unstyled'
            rippleColor='rgba(0,0,0,.1)'
          />
        }
        isOpen={isOpen.value}
        onClose={isOpen.setFalse}
        onSelect={isOpen.setFalse}
        popoverProps={{ sideOffset: 8 }}
        typographyProps={{ weight: 'medium' }}
      />
    </div>
  );
};
