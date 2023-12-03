import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';

import type { BookingsListProps } from './bookings-list.interface';
import styles from './bookings-list.module.scss';
import { Placeholder } from '@/modules/core/components/placeholder';

export const BookingsList: FC<BookingsListProps> = ({ groups }) => {
  return (
    <div className={styles.root}>
      {groups.map((group) => (
        <div className={styles.group} key={group.id}>
          <Typography className={styles.title} variant='body1'>
            {group.title}
          </Typography>
          <div className={styles.list}>
            <Placeholder
              isActive={group.list.length === 0}
              placeholder={
                <Typography className={styles.empty} variant='body2'>
                  List is empty
                </Typography>
              }
            >
              {group.list.map((event) => (
                <BookingInfoCard
                  key={event.id}
                  name={event.name}
                  serviceName={event.serviceName}
                  date={event.date}
                  variant={group.cardsVariant}
                />
              ))}
            </Placeholder>
          </div>
        </div>
      ))}
    </div>
  );
};
