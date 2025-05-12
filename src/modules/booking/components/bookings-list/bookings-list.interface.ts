import type { Booking, ServiceOnProfessional } from '@prisma/client';
import type { ReactNode } from 'react';

export type BookingListGroup = {
  id: string;
  title: string;
  list: (Booking & { serviceProfessional: ServiceOnProfessional })[];
  hidden?: boolean;
  emptyPlaceholder?: ReactNode;
};
