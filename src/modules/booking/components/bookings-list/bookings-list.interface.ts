import type { BookingInfoCardVariant } from '@/modules/booking/components/booking-info-card/booking-info-card.interface';
import type { ReactNode } from 'react';
import type { Booking, ServiceOnProfessional } from '@prisma/client';

type BookingListGroup = {
  id: string;
  title: string;
  cardsVariant: BookingInfoCardVariant;
  list: (Booking & { serviceProfessional: ServiceOnProfessional })[];
  emptyPlaceholder?: ReactNode;
};

export type BookingsListProps = {
  groups: BookingListGroup[];
};
