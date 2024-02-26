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

import { type Booking, type ServiceOnProfessional } from '@prisma/client';

export const MyBookingsContent: FC<MyBookingsContentProps> = () => {
  // query
  const { data: upcomingEvents } = trpc.booking.list.useQuery({
    expand: ['serviceProfessional'],
    sortField: 'date',
    sortDirection: 'desc',
    // professionalId
  });

  const { data: pastEvents } = trpc.booking.list.useQuery({
    expand: ['serviceProfessional'],
    sortField: 'date',
    sortDirection: 'asc',
    // professionalId
  });

  // const expectedFormat = (
  //   booking: Booking & { serviceProfessional: ServiceOnProfessional }
  // ) => ({
  //   id: booking.id,
  //   name: `${booking.guestFirstName} ${booking.guestLastName}`,
  //   serviceName: booking.serviceProfessional.title,
  //   date: booking.date,
  //   startTime: booking.startTime,
  //   endTime: booking.endTime,
  // });

  // const formattedUpcomingEvents = (upcomingEvents || []).map(expectedFormat);
  // const formattedPastEvents = (pastEvents || []).map(expectedFormat);

  const { activeTab } = useMyBookingsTab();

  return (
    <div className={styles.root}>
      {activeTab === 'list' && (
        <BookingsList
          groups={[
            {
              id: 'upcomming',
              title: 'Upcomming',
              cardsVariant: 'light',
              list: upcomingEvents as (Booking & {
                serviceProfessional: ServiceOnProfessional;
              })[],
            },
            {
              id: 'past',
              title: 'Past events',
              cardsVariant: 'light',
              list: pastEvents as (Booking & {
                serviceProfessional: ServiceOnProfessional;
              })[],
            },
          ]}
        />
      )}
      {activeTab === 'calendar' && <Calendar />}
    </div>
  );
};
