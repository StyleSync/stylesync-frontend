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
      <section className='pageContent'>
        <MyBookingsTabs />
      </section>
      <section className={styles.pageContent}>
        <div className='pageContent'>
          <MyBookingsContent />
        </div>
      </section>
    </div>
  );
}
