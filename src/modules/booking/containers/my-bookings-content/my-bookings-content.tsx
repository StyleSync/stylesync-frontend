'use client';
import { Suspense } from 'react';
// components
import { BookingsList } from '@/modules/booking/components/bookings-list';
import { Calendar } from '@/modules/schedule/components/calendar';
// hooks
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';
// style
import styles from './my-bookings-content.module.scss';

export const MyBookingsContent = () => {
  const { activeTab } = useMyBookingsTab();

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
          <BookingsList />
        </Suspense>
      )}
      {activeTab === 'calendar' && (
        <Suspense fallback={<div />}>
          <div className='flex w-full'>
            <div className='flex-1'>
              <Calendar />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};
