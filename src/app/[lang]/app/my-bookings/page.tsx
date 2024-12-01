// containers
import { MyBookingsTabs } from '@/modules/booking/containers/my-bookings-tabs';
import { MyBookingsContent } from '@/modules/booking/containers/my-bookings-content';
import { BookingProvider } from '@/modules/booking/providers/booking-provider';
// utils
import { pageGuard } from '@/modules/core/utils/route.utils';

import styles from './my-bookings.module.scss';

export default async function MyBookings() {
  const session = await pageGuard({
    require: {
      onboarding: true,
      userType: true,
    },
  });

  if (!session) {
    return null;
  }

  return (
    <BookingProvider userId={session?.user?.id}>
      <div className={styles.root}>
        <section className='px-6 md:px-[40px]'>
          <MyBookingsTabs />
        </section>
        <section className='relative flex w-full flex-1 bg-white shadow'>
          <MyBookingsContent />
        </section>
      </div>
    </BookingProvider>
  );
}
