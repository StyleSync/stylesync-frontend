import type { ReactElement } from 'react';
import type { MyBookingsTabKey } from '@/modules/booking/containers/my-bookings-tabs/my-bookings-tabs.interface';
// import { type AvailableBookingTime } from '@/server/types';

export type TabContentMap = Record<
  MyBookingsTabKey,
  {
    content: ReactElement;
  }
>;

export type MyBookingsContentProps = {};
