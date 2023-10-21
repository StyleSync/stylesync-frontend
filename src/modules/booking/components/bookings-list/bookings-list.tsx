import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';

import type { BookingsListProps } from './bookings-list.interface';
import styles from './bookings-list.module.scss';

export const BookingsList: FC<BookingsListProps> = ({ groups }) => {
  return (
    <div className={styles.root}>
      {groups.map((group) => (
        <div className={styles.group} key='id'>
          <Typography variant='body1' weight='semibold'>
            {group.title}
          </Typography>
          <div className={styles.list}>
            {group.list.map((event) => (
              <BookingInfoCard
                key={event.id}
                name={event.name}
                serviceName={event.serviceName}
                date={event.date}
                variant={group.cardsVariant}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
