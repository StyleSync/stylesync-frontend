import type { ReactElement } from 'react';
import type { MyBookingsTabKey } from '@/modules/booking/containers/my-bookings-tabs/my-bookings-tabs.interface';

export type TabContentMap = Record<
  MyBookingsTabKey,
  {
    content: ReactElement;
  }
>;

export type MyBookingsContentProps = {
  id: string;
  name: string;
  serviceName: string;
  date: string;
};

export type Booking = {
  id: string;
  serviceName: string;
  date: string;
  startTime: string;
  startendTimeTime: string;
};
