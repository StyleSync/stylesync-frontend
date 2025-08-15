'use client';
import { Suspense, useState } from 'react';

import { useBoolean } from 'usehooks-ts';

import { BookingsUserList } from '@/modules/booking/components/booking-user-list';
import { BookingsList } from '@/modules/booking/components/bookings-list';
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';
import { AddNewBookingModal } from '@/modules/client/components/add-new-booking-modal';
import { Button } from '@/modules/core/components/button';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Calendar } from '@/modules/schedule/components/calendar';
import { CalendarMobile } from '@/modules/schedule/components/mobile-calendar';
import { AppRouterOutputs } from '@/server/types';

import styles from './my-bookings-content.module.scss';

export const MyBookingsContent = () => {
  const { activeTab } = useMyBookingsTab();

  const [selectedClientForBooking, setSelectedClientForBooking] = useState<
    AppRouterOutputs['client']['get'] | null
  >(null);

  const isOpen = useBoolean(false);
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
      <Button
        icon='plus'
        variant='primary'
        className='fixed bottom-24 right-4 z-10 !h-12 !w-12 md:!hidden'
        onClick={() => {
          isOpen.setValue(true);
        }}
      />
      <AddNewBookingModal
        isOpen={isOpen.value}
        onOpenChange={isOpen.setValue}
        selectedClient={selectedClientForBooking}
        setSelectedClient={setSelectedClientForBooking}
      />
    </div>
  );
};
