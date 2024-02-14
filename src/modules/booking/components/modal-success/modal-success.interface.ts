import { type AvailableBookingTime } from '@/server/types';

export type BookingModalSuccessProps = {
  bookingData: {
    service: string;
    price: string;
    time: AvailableBookingTime;
    status: string;
  };
};
