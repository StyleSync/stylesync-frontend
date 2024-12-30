import { type FC, useState } from 'react';
import { useIntl } from 'react-intl';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { Spinner } from '@/modules/core/components/spinner';
// containers
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import type { BookingsUserListProps } from './bookings-user-list.interface';
import styles from './bookings-user-list.module.scss';

const now = new Date().toISOString();

export const BookingsUserList: FC<BookingsUserListProps> = () => {
  const intl = useIntl();
  // state
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [activeBookingCode, setActiveBookingCode] = useState<string | null>(
    null
  );

  const upcomingEventsQuery = trpc.booking.myBookings.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      sortField: 'startTime',
      startDate: now,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const pastEventsQuery = trpc.booking.myBookings.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      sortField: 'startTime',
      endDate: now,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const upcomingEvents =
    upcomingEventsQuery.data?.pages.map((page) => page.items).flat() || [];

  const pastEvents =
    pastEventsQuery.data?.pages.map((page) => page.items).flat() || [];

  return (
    <>
      <div className={styles.root}>
        <div className={styles.group}>
          <Typography className={styles.title} variant='body1'>
            {intl.formatMessage({ id: 'booking.list.upcomming' })}
          </Typography>
          <Placeholder
            isActive={upcomingEvents.length === 0}
            placeholder={
              <Typography className={styles.empty} variant='body2'>
                {intl.formatMessage({ id: 'booking.list.listEmpty' })}
              </Typography>
            }
          >
            <div className='mt-8 grid gap-6 [grid-template-columns:repeat(auto-fill,_minmax(300px,1fr))] [grid-template-rows:max-content] md:[grid-template-columns:repeat(auto-fill,_minmax(400px,1fr))]'>
              {upcomingEvents.map((booking) => (
                <BookingInfoCard
                  key={booking.id}
                  /* @ts-ignore */
                  booking={booking}
                  onClick={(data) => {
                    setActiveBookingId(data.id);
                    setActiveBookingCode(data.code);
                  }}
                />
              ))}
            </div>
            <InfinityListController
              hasNextPage={upcomingEventsQuery.hasNextPage || false}
              onLoadMore={upcomingEventsQuery.fetchNextPage}
              isNextPageLoading={upcomingEventsQuery.isFetchingNextPage}
            />
            {upcomingEventsQuery.isFetchingNextPage && (
              <div className='flex justify-center py-4'>
                <Spinner size={32} />
              </div>
            )}
          </Placeholder>
        </div>
        <div className={styles.group}>
          <Typography className={styles.title} variant='body1'>
            {intl.formatMessage({ id: 'booking.list.past' })}
          </Typography>
          <Placeholder
            isActive={pastEvents.length === 0}
            placeholder={
              <Typography className={styles.empty} variant='body2'>
                {intl.formatMessage({ id: 'booking.list.listEmpty' })}
              </Typography>
            }
          >
            <div className='mt-8 grid gap-6 [grid-template-columns:repeat(auto-fill,_minmax(300px,1fr))] [grid-template-rows:max-content] md:[grid-template-columns:repeat(auto-fill,_minmax(400px,1fr))]'>
              {pastEvents.map((booking) => (
                <BookingInfoCard
                  key={booking.id}
                  /* @ts-ignore */
                  booking={booking}
                  onClick={(data) => {
                    setActiveBookingId(data.id);
                    setActiveBookingCode(data.code);
                  }}
                />
              ))}
            </div>
            <InfinityListController
              hasNextPage={pastEventsQuery.hasNextPage || false}
              onLoadMore={pastEventsQuery.fetchNextPage}
              isNextPageLoading={pastEventsQuery.isFetchingNextPage}
            />
            {pastEventsQuery.isFetchingNextPage && (
              <div className='flex justify-center py-4'>
                <Spinner size={32} />
              </div>
            )}
          </Placeholder>
        </div>
      </div>

      <BookingInfoDialog
        bookingCode={activeBookingCode}
        bookingId={activeBookingId}
        onClose={() => {
          setActiveBookingId(null);
        }}
      />
    </>
  );
};
