import { type FC, useState } from 'react';

import { Skeleton } from '@mui/material';
import { useIntl } from 'react-intl';

import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';
import { PointsBookingActions } from '@/modules/booking/components/points-booking-actions/points-booking-action';
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
import { groupBookingsByDate } from '@/modules/booking/utils/booking.utils';
import { Illustration } from '@/modules/core/components/illustration';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';

import styles from './bookings-list.module.scss';

const now = new Date().toISOString();

type BookingsListProps = {
  professionalId: string;
};

export const BookingsList: FC<BookingsListProps> = ({ professionalId }) => {
  const intl = useIntl();

  // state
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  const upcomingEventsQuery = trpc.booking.list.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      sortField: 'startTime',
      startDate: now,
      professionalId,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const pastEventsQuery = trpc.booking.list.useInfiniteQuery(
    {
      expand: ['serviceProfessional'],
      sortField: 'startTime',
      endDate: now,
      professionalId,
      sortDirection: 'desc',
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const upcomingEvents = groupBookingsByDate(
    upcomingEventsQuery.data?.pages.map((page) => page.items).flat() || []
  );
  const pastEvents = groupBookingsByDate(
    pastEventsQuery.data?.pages.map((page) => page.items).flat() || []
  );

  if (upcomingEventsQuery.isPending || pastEventsQuery.isPending) {
    const SKELETON_ITEMS_COUNT = 3;

    return (
      <div className='flex flex-col px-4'>
        {[...Array(SKELETON_ITEMS_COUNT)].map((_, index) => (
          <div
            key={index}
            className='flex items-center gap-x-4 border-b border-gray-light py-2 last:border-b-0'
          >
            <Skeleton variant='circular' width={38} height={38} />
            <div className='flex flex-col'>
              <Skeleton width={200} height={24} />
              <Skeleton width={120} height={20} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.group}>
          <PointsBookingActions />
          <Placeholder
            isActive={Object.keys(upcomingEvents).length === 0}
            placeholder={
              <div className='flex flex-col items-center justify-center gap-y-4 py-8'>
                <Illustration name='emptyList' className='w-[350px]' />
                <span className='text-text text-sm font-medium text-dark'>
                  Немає запланованих бронювань
                </span>
              </div>
            }
          >
            <div className='mt-2'>
              {Object.keys(upcomingEvents).map((date) => (
                <div className='flex flex-col gap-y-4' key={date}>
                  <span className='text-xs font-medium text-gray-accent'>
                    {formatI18n(new Date(date), 'dd MMMM yyyy', intl.locale)}
                  </span>
                  <div className='grid gap-6 [grid-template-columns:repeat(auto-fill,_minmax(300px,1fr))] [grid-template-rows:max-content] md:[grid-template-columns:repeat(auto-fill,_minmax(400px,1fr))]'>
                    {upcomingEvents[date].map((booking) => (
                      <BookingInfoCard
                        key={booking.id}
                        /* @ts-ignore */
                        booking={booking}
                        onClick={(data) => {
                          setActiveBookingId(data.id);
                        }}
                      />
                    ))}
                  </div>
                </div>
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
          <Placeholder
            isActive={Object.keys(pastEvents).length === 0}
            placeholder={null}
          >
            <div className='relative -left-4 flex h-[30px] w-[calc(100%+2rem)] items-center bg-gray-light px-4'>
              <span className='text-sm font-medium text-gray-accent'>
                {intl.formatMessage({ id: 'booking.list.past' })}
              </span>
            </div>
            <div className='mt-6 flex flex-col gap-y-8 pb-16'>
              {Object.keys(pastEvents).map((date) => (
                <div className='flex flex-col gap-y-4' key={date}>
                  <span className='text-xs font-medium text-gray-accent'>
                    {formatI18n(new Date(date), 'dd MMMM yyyy', intl.locale)}
                  </span>
                  <div className='grid gap-x-6 [grid-template-columns:repeat(auto-fill,_minmax(300px,1fr))] [grid-template-rows:max-content] md:[grid-template-columns:repeat(auto-fill,_minmax(400px,1fr))]'>
                    {pastEvents[date].map((booking) => (
                      <div key={booking.id} className='py-2'>
                        <BookingInfoCard
                          /* @ts-ignore */
                          booking={booking}
                          onClick={(data) => {
                            setActiveBookingId(data.id);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
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
        bookingId={activeBookingId}
        onClose={() => {
          setActiveBookingId(null);
        }}
      />
    </>
  );
};
