import { type BookingFormValue } from '@/modules/booking/components/booking-form/booking-form';
import { type AvailableBookingTime } from '@/server/types';

export type CreateBookingRequestData = BookingFormValue & {
  serviceOnProfessional: string;
  selectedDay: string;
  selectedTimeRange: AvailableBookingTime;
};

export type ServiceBookingModalProps = {
  isLoading: boolean;
  onConfirm: (data: CreateBookingRequestData) => void;
  selectedService?: string;
};
