'use client';
import clsx from 'clsx';
import { useState } from 'react';
// components
import { Tabs, Typography, Avatar, Icon } from '@/modules/core/components';

import styles from './my-bookings.module.scss';

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
              <div className={styles.bookingContainer}>
                <div className={styles.bookingInfo}>
                  <div className={styles.avatar}>
                    <Avatar />
                  </div>
                  <div className={styles.bookingDateEvent}>
                    <div className={styles.bookingdate}>
                      <Typography variant='body1'>
                        Thursday, Jun 01, 12:00 - 13:00
                      </Typography>
                    </div>
                    <div className={styles.bookingEvent}>
                      <Typography
                        className={styles.bookingEventTypography}
                        variant='body2'
                      >
                        Tanusha’s Beauty, evening makeup
                      </Typography>
                    </div>
                  </div>
                </div>
                <Icon className={styles.bookingIcon} name='points' />
              </div>
            </div>

            <div className={styles.tabBox}>
              <Typography variant='subtitle'>Past bookings</Typography>
              <div className={styles.bookingContainer}>
                <div className={styles.bookingInfo}>
                  <div className={styles.avatar}>
                    <Avatar />
                  </div>
                  <div className={styles.bookingDateEvent}>
                    <div className={styles.bookingdate}>
                      <Typography variant='body1'>
                        Thursday, Jun 01, 12:00 - 13:00
                      </Typography>
                    </div>
                    <div className={styles.bookingEvent}>
                      <Typography
                        className={styles.bookingEventTypography}
                        variant='body2'
                      >
                        Tanusha’s Beauty, evening makeup
                      </Typography>
                    </div>
                  </div>
                </div>
                <Icon className={styles.bookingIcon} name='points' />
              </div>
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
