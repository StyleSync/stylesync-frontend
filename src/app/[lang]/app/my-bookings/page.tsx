// containers
import { MyBookingsTabs } from '@/modules/booking/containers/my-bookings-tabs';
import { MyBookingsContent } from '@/modules/booking/containers/my-bookings-content';
// utils
import { pageGuard } from '@/modules/core/utils/route.utils';

import styles from './my-bookings.module.scss';

export default async function MyBookings() {
  await pageGuard({
    require: {
      onboarding: true,
      userType: true,
    },
  });

  return (
    <div className={styles.root}>
      <section className='px-8'>
        <MyBookingsTabs />
      </section>
      <section className='relative flex flex-1 w-full shadow bg-white px-8'>
        <MyBookingsContent />
      </section>
    </div>
  );
}
