import { type FC, useState, useContext } from 'react';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';
// containers
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';
import { Spinner } from '@/modules/core/components/spinner';
import { InfinityListController } from '@/modules/core/components/infinity-list-controller/infinity-list-controller';
import { PointsBookingActions } from '@/modules/booking/components/points-booking-actions';
// context
import { BookingContext } from '@/modules/booking/providers/booking-provider';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import styles from './bookings-list.module.scss';

const now = new Date().toISOString();

type BookingsListProps = {
  professionalId: string;
};

export const BookingsList: FC<BookingsListProps> = ({ professionalId }) => {
  const intl = useIntl();
  const isOpenDropMenu = useBoolean();
  // context
  const { book } = useContext(BookingContext);
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
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const upcomingEvents =
    upcomingEventsQuery.data?.pages.map((page) => page.items).flat() || [];
  const pastEvents =
    pastEventsQuery.data?.pages.map((page) => page.items).flat() || [];

  if (upcomingEventsQuery.isLoading || pastEventsQuery.isLoading) {
    return (
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Spinner size='large' />
      </div>
    );
  }

  return (
    <>
      <div className={styles.root}>
        <div className={styles.group}>
          <div className='flex items-center justify-between'>
            <Typography className={styles.title} variant='body1'>
              {intl.formatMessage({ id: 'booking.list.upcomming' })}
            </Typography>
            <PointsBookingActions
              isOpen={isOpenDropMenu.value}
              onToggle={isOpenDropMenu.toggle}
              onSelect={(item) => {
                if (item.id === 'add') {
                  book();
                  isOpenDropMenu.setFalse();
                }
              }}
              items={[
                {
                  id: 'add',
                  variant: 'primary',
                  icon: 'plus',
                  text: intl.formatMessage({
                    id: 'calendar.add.event',
                  }),
                },
              ]}
            />
          </div>
          <Placeholder
            isActive={upcomingEvents.length === 0}
            placeholder={
              <div className='py-8'>
                <Typography className={styles.empty} variant='body2'>
                  {intl.formatMessage({ id: 'booking.list.listEmpty' })}
                </Typography>
              </div>
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
              <div className='py-8'>
                <Typography className={styles.empty} variant='body2'>
                  {intl.formatMessage({ id: 'booking.list.listEmpty' })}
                </Typography>
              </div>
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
        bookingId={activeBookingId}
        onClose={() => {
          setActiveBookingId(null);
        }}
      />
    </>
  );
};
