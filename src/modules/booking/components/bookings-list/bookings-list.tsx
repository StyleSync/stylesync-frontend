import { type FC } from 'react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import type {
  BookingListGroup,
  BookingsListProps,
} from './bookings-list.interface';
import type { BookingListType } from '@/modules/booking/containers/my-bookings-content/my-bookings-content.interface';

import styles from './bookings-list.module.scss';

const now = new Date().toISOString();

export const BookingsList: FC<BookingsListProps> = () => {
  // queries
  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  if (!me.professional) {
    throw new Error('Unable to load professional data');
  }

  const [upcomingEvents] = trpc.booking.list.useSuspenseQuery({
    expand: ['serviceProfessional'],
    sortField: 'date',
    startDate: now,
    professionalId: me.professional.id,
  });
  const [pastEvents] = trpc.booking.list.useSuspenseQuery({
    expand: ['serviceProfessional'],
    sortField: 'date',
    endDate: now,
    professionalId: me.professional.id,
  });

  const groups: BookingListGroup[] = [
    {
      id: 'upcomming',
      title: 'Upcomming',
      list: upcomingEvents as BookingListType,
    },
    {
      id: 'past',
      title: 'Past events',
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
                      List is empty
                    </Typography>
                  }
                >
                  {group.list?.map((booking) => (
                    <BookingInfoCard
                      key={booking.id}
                      name={`${booking.guestFirstName} ${booking.guestLastName}`}
                      serviceName={booking.serviceProfessional.title}
                      date={booking.date}
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
