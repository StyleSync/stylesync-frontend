import { type FC, useState, useContext } from 'react';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';
// containers
import { BookingInfoDialog } from '@/modules/booking/containers/booking-info-dialog';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
import { BookingInfoCard } from '@/modules/booking/components/booking-info-card';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Button } from '@/modules/core/components/button';
// context
import { BookingContext } from '@/modules/booking/providers/booking-provider';
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
  const intl = useIntl();
  const isOpenDropMenu = useBoolean();
  // context
  const { book } = useContext(BookingContext);
  // state
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  // queries
  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  if (!me.professional) {
    throw new Error('Unable to load professional data');
  }

  const [upcomingEvents] = trpc.booking.list.useSuspenseQuery({
    expand: ['serviceProfessional'],
    sortField: 'startTime',
    startDate: now,
    professionalId: me.professional.id,
  });
  const [pastEvents] = trpc.booking.list.useSuspenseQuery({
    expand: ['serviceProfessional'],
    sortField: 'startTime',
    endDate: now,
    professionalId: me.professional.id,
  });

  const groups: BookingListGroup[] = [
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
    <>
      <div className={styles.root}>
        {groups.map(
          (group) =>
            !group.hidden && (
              <div className={styles.group} key={group.id}>
                <div className='flex items-center justify-between'>
                  <Typography className={styles.title} variant='body1'>
                    {group.title}
                  </Typography>
                  {group.id === 'upcomming' && (
                    <DropdownMenu
                      isOpen={isOpenDropMenu.value}
                      onClose={isOpenDropMenu.setFalse}
                      onSelect={({ id }) => {
                        if (id === 'add') {
                          book();
                          isOpenDropMenu.setFalse();
                        }
                      }}
                      trigger={
                        <Button
                          aria-label='Add event'
                          aria-haspopup='true'
                          className='!h-6 !w-6'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            isOpenDropMenu.toggle();
                          }}
                          variant='unstyled'
                          icon='points'
                        />
                      }
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
                      popoverProps={{
                        align: 'start',
                        backgroundBlurEffect: false,
                        side: 'bottom',
                        classes: { content: '!mr-[22px]' },
                      }}
                    />
                  )}
                </div>
                <Placeholder
                  isActive={group.list?.length === 0}
                  placeholder={
                    <Typography className={styles.empty} variant='body2'>
                      {intl.formatMessage({ id: 'booking.list.listEmpty' })}
                    </Typography>
                  }
                >
                  <div className='mt-8 grid gap-6 [grid-template-columns:repeat(auto-fill,_minmax(300px,1fr))] [grid-template-rows:max-content] md:[grid-template-columns:repeat(auto-fill,_minmax(400px,1fr))]'>
                    {group.list?.map((booking) => (
                      <BookingInfoCard
                        key={booking.id}
                        booking={booking}
                        onClick={(data) => {
                          setActiveBookingId(data.id);
                        }}
                      />
                    ))}
                  </div>
                </Placeholder>
              </div>
            )
        )}
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
