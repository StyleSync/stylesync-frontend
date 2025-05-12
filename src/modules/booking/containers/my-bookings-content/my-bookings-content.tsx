'use client';
import { Suspense } from 'react';

import { BookingsUserList } from '@/modules/booking/components/booking-user-list';
import { BookingsList } from '@/modules/booking/components/bookings-list';
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Calendar } from '@/modules/schedule/components/calendar';
import { CalendarMobile } from '@/modules/schedule/components/mobile-calendar';

// style
import styles from './my-bookings-content.module.scss';

export const MyBookingsContent = () => {
  const { activeTab } = useMyBookingsTab();

  const deviceType = useDeviceType();

  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  return (
    <div className={styles.root}>
      {activeTab === 'list' && (
        <>
          {me.userType === 'PROFESSIONAL' && me.professional && (
            <BookingsList professionalId={me.professional.id} />
          )}
          {me.userType === 'CUSTOMER' && <BookingsUserList />}
        </>
      )}
      {activeTab === 'calendar' && (
        <Suspense fallback={<div />}>
          <div className='flex w-full flex-1'>
            <div className='flex w-full flex-1'>
              {deviceType === 'mobile' ? <CalendarMobile /> : <Calendar />}
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};
