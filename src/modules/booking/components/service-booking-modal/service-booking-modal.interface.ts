import { type ReactNode } from 'react';
import { type BookingFormValue } from '../booking-form/booking-form.interface';
import { type AvailableBookingTime } from '@/server/types';

export type CreateBookingRequestData = BookingFormValue & {
  serviceOnProfessional: string;
  selectedDay: string;
  selectedTimeRange: AvailableBookingTime;
};

export type ServiceBookingModalProps = {
  isLoading: boolean;
  onConfirm: (data: CreateBookingRequestData) => void;
};
