import { type FC } from 'react';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import type {
  BookingUserListGroup,
  BookingsUserListProps,
} from './bookings-user-list.interface';
import type { BookingListType } from '@/modules/booking/containers/my-bookings-content/my-bookings-content.interface';

import styles from './bookings-user-list.module.scss';

const now = new Date().toISOString();

export const BookingsUserList: FC<BookingsUserListProps> = () => {
  const intl = useIntl();

  const [upcomingEvents] = trpc.booking.myBookings.useSuspenseQuery({
    expand: ['serviceProfessional'],
    sortField: 'startTime',
    startDate: now,
  });

  const [pastEvents] = trpc.booking.myBookings.useSuspenseQuery({
    expand: ['serviceProfessional'],
    sortField: 'startTime',
    endDate: now,
  });

  const groups: BookingUserListGroup[] = [
    {
      id: 'upcomming',
      title: intl.formatMessage({ id: 'booking.list.upcomming' }),
      list: upcomingEvents as BookingListType,
    },
    {
      id: 'past',
      title: intl.formatMessage({ id: 'booking.list.past' }),
      hidden: !pastEvents.length,
      list: pastEvents as BookingListType,
    },
  ];

  return (
    <div className={styles.root}>
      {groups.map(
        (group) =>
          !group.hidden && (
            <div className={styles.group} key={group.id}>
              <Typography className={styles.title} variant='body1'>
                {group.title}
              </Typography>
              <div className={styles.list}>
                <Placeholder
                  isActive={group.list?.length === 0}
                  placeholder={
                    <Typography className={styles.empty} variant='body2'>
                      {intl.formatMessage({ id: 'booking.list.listEmpty' })}
                    </Typography>
                  }
                >
                  {group.list?.map((booking) => (
                    <BookingInfoCard
                      phone={booking.guestPhone}
                      email={booking.guestEmail}
                      key={booking.id}
                      name={`${booking.guestFirstName} ${booking.guestLastName}`}
                      serviceName={booking.serviceProfessional.title}
                      date={booking.startTime}
                      startTime={booking.startTime}
                      endTime={booking.endTime}
                      variant='light'
                    />
                  ))}
                </Placeholder>
              </div>
            </div>
          )
      )}
    </div>
  );
};
