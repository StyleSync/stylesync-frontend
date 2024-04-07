import type { ReactNode } from 'react';
import type { Booking, ServiceOnProfessional } from '@prisma/client';

export type BookingListGroup = {
  id: string;
  title: string;
  list: (Booking & { serviceProfessional: ServiceOnProfessional })[];
  hidden?: boolean;
  emptyPlaceholder?: ReactNode;
};

export type BookingsListProps = {};
