'use client';
import { type FC } from 'react';
import { faker } from '@faker-js/faker';
// components
import { BookingsList } from '@/modules/booking/components/bookings-list';
import { Calendar } from '@/modules/schedule/components/calendar';
// hooks
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';

import type {
  MyBookingsContentProps,
  TabContentMap,
} from './my-bookings-content.interface';
import styles from './my-bookings-content.module.scss';

const createEventsListMock = (num: number) =>
  [...new Array(num)].map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    serviceName: 'evening makeup',
    date: faker.date.future().toString(),
  }));

const upcomingEvents = createEventsListMock(1);
const pastEvents = createEventsListMock(2);

const tabContentMap: TabContentMap = {
  list: {
    content: (
      <BookingsList
        groups={[
          {
            id: 'upcomming',
            title: 'Upcomming events',
            cardsVariant: 'light',
            list: upcomingEvents,
          },
          {
            id: 'past',
            title: 'Past events',
            cardsVariant: 'light',
            list: pastEvents,
          },
        ]}
      />
    ),
  },
  calendar: {
    content: <Calendar />,
  },
};

export const MyBookingsContent: FC<MyBookingsContentProps> = () => {
  const { activeTab } = useMyBookingsTab();
  const { content } = tabContentMap[activeTab];

  return <div className={styles.root}>{content}</div>;
};
