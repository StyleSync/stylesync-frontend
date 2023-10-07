'use client';
import clsx from 'clsx';
import { useState } from 'react';
// components
import { BookingInfoCard } from '@/modules/booking/components/bookingInfoCard';
import { Tabs } from '@/modules/core/components/tabs';
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from './my-bookings.module.scss';

import { faker } from '@faker-js/faker';

export default function MyBookings() {
  const [value, setValue] = useState('bookings');

  return (
    <div className={styles.root}>
      <section className={clsx(styles.section)}>
        <div className={styles.title}>
          <Typography variant='title'>My bookings</Typography>
        </div>

        <Tabs
          value={value}
          onChange={setValue}
          tabs={[
            {
              key: 'bookings',
              name: 'Bookings',
              icon: 'list',
            },
            {
              key: 'calendar',
              name: 'Calendar',
              icon: 'calendar',
            },
          ]}
        />

        {value === 'bookings' && (
          <div className={styles.tabContiner}>
            <div className={styles.tabBox}>
              <Typography variant='subtitle'>Upcoming bookings</Typography>

              <BookingInfoCard
                name='Tanusha’s Beauty'
                serviceName=' evening makeup'
                date={faker.date.future().toString()}
              />
            </div>

            <div className={styles.tabBox}>
              <Typography variant='subtitle'>Past bookings</Typography>
              <BookingInfoCard
                name='Tanusha’s Beauty'
                serviceName=' evening makeup'
                date={faker.date.past().toString()}
              />
            </div>
          </div>
        )}

        {value === 'calendar' && (
          <div>
            <h2>Calendar</h2>
          </div>
        )}
      </section>
    </div>
  );
}
