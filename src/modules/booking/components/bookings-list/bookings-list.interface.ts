import type { BookingInfoCardVariant } from '@/modules/booking/components/booking-info-card/booking-info-card.interface';
import type { ReactNode } from 'react';

type BookingListGroup = {
  id: string;
  title: string;
  cardsVariant: BookingInfoCardVariant;
  list: {
    id: string;
    name: string;
    serviceName: string;
    date: string;
  }[]; // todo: replace this type with BE Service type if ready
  emptyPlaceholder?: ReactNode;
};

export type BookingsListProps = {
  groups: BookingListGroup[];
};
