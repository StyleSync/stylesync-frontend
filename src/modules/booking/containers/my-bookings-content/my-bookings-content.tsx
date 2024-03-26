'use client';

// components
import { BookingsList } from '@/modules/booking/components/bookings-list';
import { Calendar } from '@/modules/schedule/components/calendar';
// hooks
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import type { BookingListType } from './my-bookings-content.interface';
// style
import styles from './my-bookings-content.module.scss';

export const MyBookingsContent = () => {
  const { data: me } = trpc.user.me.useQuery({ expand: ['professional'] });
  // query
  const { data: upcomingEvents } = trpc.booking.list.useQuery({
    expand: ['serviceProfessional'],
    sortField: 'date',
    sortDirection: 'desc',
    professionalId: me?.id,
  });

  const { data: pastEvents } = trpc.booking.list.useQuery({
    expand: ['serviceProfessional'],
    sortField: 'date',
    sortDirection: 'asc',
    professionalId: me?.id,
  });

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
              list: upcomingEvents as BookingListType,
            },
            {
              id: 'past',
              title: 'Past events',
              cardsVariant: 'light',
              list: pastEvents as BookingListType,
            },
          ]}
        />
      )}
      {activeTab === 'calendar' && <Calendar />}
    </div>
  );
};
