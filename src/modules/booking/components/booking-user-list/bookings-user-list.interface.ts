import type { ReactNode } from 'react';
import type { Booking, ServiceOnProfessional } from '@prisma/client';

export type BookingUserListGroup = {
  id: string;
  title: string;
  list: (Booking & { serviceProfessional: ServiceOnProfessional })[];
  hidden?: boolean;
  emptyPlaceholder?: ReactNode;
};

export type BookingsUserListProps = {};
