import type { BookingListType } from '@/modules/booking/containers/my-bookings-content/my-bookings-content.interface';

export type BookingInfoCardProps = {
  booking: BookingListType[number];
  onClick?: (booking: BookingListType[number]) => void;
};
