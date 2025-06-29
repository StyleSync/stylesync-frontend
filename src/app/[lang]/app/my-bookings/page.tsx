import { MyBookingsContent } from '@/modules/booking/containers/my-bookings-content';
import { MyBookingsTabs } from '@/modules/booking/containers/my-bookings-tabs';
import { BookingProvider } from '@/modules/booking/providers/booking-provider';
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
        <section className='px-4 md:px-[40px]'>
          <MyBookingsTabs />
        </section>
        <section className='relative flex w-full flex-1'>
          <MyBookingsContent />
        </section>
      </div>
    </BookingProvider>
  );
}
