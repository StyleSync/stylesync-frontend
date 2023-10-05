import { type FC } from 'react';

import { format } from 'date-fns';

// components
import { Avatar, Typography, Popover, Button } from '@/modules/core/components';
// hooks
import { useBoolean } from 'usehooks-ts';

import type { BookingInfoCardProps } from './booking-info-card.interface';

import styles from './booking-info-card.module.scss';

export const BookingInfoCard: FC<BookingInfoCardProps> = ({
  name,
  date,
  serviceName,
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
  const isPopoverOpen = useBoolean();

  return (
    <div className={styles.bookingContainer}>
      <div className={styles.bookingInfo}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <div className={styles.bookingDateEvent}>
          <div className={styles.bookingdate}>
            <Typography variant='body1'>{formattedDate}</Typography>
          </div>
          <div className={styles.bookingEvent}>
            <Typography
              className={styles.bookingEventTypography}
              variant='body2'
            >
              {name}, {serviceName}
            </Typography>
          </div>
        </div>
      </div>
      <Popover
        trigger={
          <Button
            onClick={isPopoverOpen.toggle}
            icon='points'
            variant='unstyled'
          />
        }
        isOpen={isPopoverOpen.value}
        onClose={isPopoverOpen.setFalse}
      >
        <div className={styles.detailsMenu}>
          <div className={styles.detailsMenuItem}>
            <Button variant='unstyled' text='View pros profile' />
          </div>
          <div className={styles.detailsMenuItem}>
            <Button variant='unstyled' text='Reschedule' />
          </div>
          <div className={styles.detailsMenuItem}>
            <Button variant='unstyled' text='Cancel' />
          </div>
        </div>
      </Popover>
    </div>
  );
};
