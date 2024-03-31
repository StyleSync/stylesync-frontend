import { type AvailableBookingTime } from '@/server/types';

export type BookingTimeSelectProps = {
  selectedDay: null | string;
  setSelectedDay: (date: string | null) => void;
  selectedTimeRange: AvailableBookingTime | null;
  setSelectedTimeRange: (timeRange: AvailableBookingTime | null) => void;
  professionalId: string;
};
