import { type FC } from 'react';
// components
import { Spinner } from '@/modules/core/components/spinner';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';
// type
import type { BookingsListProps } from './bookings-list.interface';
// style

import styles from './bookings-list.module.scss';

export const BookingsList: FC<BookingsListProps> = ({ groups, loading }) => {
  return (
    <div className={styles.root}>
      {groups.map((group) => (
        <div className={styles.group} key={group.id}>
          <Typography className={styles.title} variant='body1'>
            {group.title}
          </Typography>
          <div className={styles.list}>
            {loading ? (
              <div className={styles.spinner}>
                <Spinner />
              </div>
            ) : (
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
                    startTime={event.startTime}
                    endTime={event.endTime}
                    variant={group.cardsVariant}
                  />
                ))}
              </Placeholder>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
