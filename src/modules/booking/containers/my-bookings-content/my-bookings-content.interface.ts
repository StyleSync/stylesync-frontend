import { type Booking, type ServiceOnProfessional } from '@prisma/client';
import type { ReactElement } from 'react';

import type { MyBookingsTabKey } from '@/modules/booking/containers/my-bookings-tabs/my-bookings-tabs.interface';

export type TabContentMap = Record<
  MyBookingsTabKey,
  {
    content: ReactElement;
  }
>;

export type BookingListType = (Booking & {
  serviceProfessional: ServiceOnProfessional;
})[];
