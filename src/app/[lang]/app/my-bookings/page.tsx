'use client';
import clsx from 'clsx';
import { useCallback } from 'react';
// components
import { BookingInfoCard } from '@/modules/booking/components/bookingInfoCard';
import { Tabs } from '@/modules/core/components/tabs';
import { Typography } from '@/modules/core/components/typogrpahy';
import Bg from '@/assets/images/bg-1.png';
import styles from './my-bookings.module.scss';
// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';

import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { Calendar } from '@/modules/schedule/components/calendar';

export default function MyBookings() {
  // todo: move this logic outside page and remove use client
  const { queryParams, setQueryParams } = useQueryParams<{
    tab: 'calendar' | 'list';
  }>();
  const activeTab = queryParams.tab ?? 'list';

  const handleTabChange = useCallback(
    (key: string) => {
      setQueryParams({ tab: key as 'calendar' | 'list' });
    },
    [setQueryParams]
  );

  return (
    <div className={styles.root}>
      <Image {...Bg} alt='background' className={styles.img} />
      <section className={'pageContent'}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          tabs={[
            {
              key: 'list',
              name: 'List',
              icon: 'list',
            },
            {
              key: 'calendar',
              name: 'Calendar',
              icon: 'calendar',
            },
          ]}
        />
      </section>
      <div className={styles.pageContent}>
        <section className={clsx('pageContent', styles.light)}>
          {activeTab === 'list' && (
            <div className={styles.tabContiner}>
              <div className={styles.tabBox}>
                <Typography variant='body1' weight='semibold'>
                  Upcoming bookings
                </Typography>

                <BookingInfoCard
                  name='Tanusha’s Beauty'
                  serviceName=' evening makeup'
                  date={faker.date.future().toString()}
                  variant='green'
                />
              </div>

              <div className={styles.tabBox}>
                <Typography variant='body1' weight='semibold'>
                  Past bookings
                </Typography>
                <BookingInfoCard
                  name='Tanusha’s Beauty'
                  serviceName=' evening makeup'
                  date={faker.date.past().toString()}
                />
                <BookingInfoCard
                  name='Tanusha’s Beauty'
                  serviceName=' evening makeup'
                  date={faker.date.past().toString()}
                />
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className={styles.tabBox}>
              <Calendar />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
