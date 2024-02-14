'use client';
import { type FC } from 'react';
// components
import { BookingsList } from '@/modules/booking/components/bookings-list';
import { Calendar } from '@/modules/schedule/components/calendar';
// hooks
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import type { MyBookingsContentProps } from './my-bookings-content.interface';
// style
import styles from './my-bookings-content.module.scss';

export const MyBookingsContent: FC<MyBookingsContentProps> = () => {
  // // query
  const { data: bookingList, ...bookingListQuery } = trpc.booking.list.useQuery(
    { expand: ['serviceProfessional'] }
  );

  const currentDate = new Date();

  console.log(bookingList);

  const expectedFormat = (booking: any) => ({
    id: booking.id,
    name: `${booking.guestFirstName} ${booking.guestLastName}`,
    serviceName: booking.serviceProfessional.title,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
  });

  const upcomingEvents = (bookingList || [])
    .filter((booking) => new Date(booking.date) > currentDate)
    .map(expectedFormat);

  const pastEvents = (bookingList || [])
    .filter((booking) => new Date(booking.date) < currentDate)
    .map(expectedFormat);

  const { activeTab } = useMyBookingsTab();

  return (
    <div className={styles.root}>
      {activeTab === 'list' && (
        <BookingsList
          loading={bookingListQuery.isLoading}
          groups={[
            {
              id: 'upcomming',
              title: 'Upcomming',
              cardsVariant: 'light',
              list: upcomingEvents,
            },
            {
              id: 'past',
              title: 'Past events',
              cardsVariant: 'light',
              list: pastEvents,
            },
          ]}
        />
      )}
      {activeTab === 'calendar' && <Calendar />}
    </div>
  );
};
