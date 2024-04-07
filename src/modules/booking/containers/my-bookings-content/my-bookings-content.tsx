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
            <div className='flex flex-col w-full gap-y-8'>
              <div className='h-5 skeleton w-[90px] rounded-md' />
              <div className='flex flex-col w-full gap-y-4'>
                <div className='skeleton w-full h-[76px] rounded-xl' />
                <div className='skeleton w-full h-[76px] rounded-xl' />
                <div className='skeleton w-full h-[76px] rounded-xl' />
              </div>
            </div>
          }
        >
          <BookingsList />
        </Suspense>
      )}
      {activeTab === 'calendar' && <Calendar />}
    </div>
  );
};
