import type { ReactElement } from 'react';
import type { MyBookingsTabKey } from '@/modules/booking/containers/my-bookings-tabs/my-bookings-tabs.interface';

export type TabContentMap = Record<
  MyBookingsTabKey,
  {
    content: ReactElement;
  }
>;

export type MyBookingsContentProps = {};
