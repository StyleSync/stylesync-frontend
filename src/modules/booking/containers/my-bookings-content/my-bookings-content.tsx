'use client';
import { Suspense } from 'react';
// components
import { BookingsList } from '@/modules/booking/components/bookings-list';
// import { Calendar } from '@/modules/schedule/components/calendar';
import { CalendarMobile } from '@/modules/schedule/components/mobile-calendar';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// hooks
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';
// style
import styles from './my-bookings-content.module.scss';
import { BookingsUserList } from '../../components/booking-user-list';

export const MyBookingsContent = () => {
  const { activeTab } = useMyBookingsTab();

  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  return (
    <div className={styles.root}>
      {activeTab === 'list' && (
        <Suspense
          fallback={
            <div className='flex w-full flex-col gap-y-8'>
              <div className='skeleton h-5 w-[90px] rounded-md' />
              <div className='flex w-full flex-col gap-y-4'>
                <div className='skeleton h-[76px] w-full rounded-xl' />
                <div className='skeleton h-[76px] w-full rounded-xl' />
                <div className='skeleton h-[76px] w-full rounded-xl' />
              </div>
            </div>
          }
        >
          {me.userType === 'PROFESSIONAL' && <BookingsList />}
          {me.userType === 'CUSTOMER' && <BookingsUserList />}
        </Suspense>
      )}
      {activeTab === 'calendar' && (
        <Suspense fallback={<div />}>
          <div className='flex w-full'>
            <div className='flex-1'>
              {/* <Calendar /> */}
              <CalendarMobile />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};
