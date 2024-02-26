export type BookingInfoCardVariant = 'light' | 'green';

// import { type AvailableBookingTime } from '@/server/types';

export type BookingInfoCardProps = {
  name: string;
  serviceName: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  variant?: BookingInfoCardVariant;
};
