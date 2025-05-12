import { type BookingFormValue } from '@/modules/booking/components/booking-form/booking-form';
import type { ServiceOnProfessionalListItem } from '@/modules/service/types/service.types';
import {
  type AppRouterOutputs,
  type AvailableBookingTime,
} from '@/server/types';

export type CreateBookingRequestData = BookingFormValue & {
  serviceOnProfessional: string;
  selectedDay: string;
  selectedTimeRange: AvailableBookingTime;
};

export type ServiceBookingModalProps = {
  isLoading: boolean;
  onConfirm: (data: CreateBookingRequestData) => void;
  selectedService: ServiceOnProfessionalListItem | null;
  professional: AppRouterOutputs['professional']['get'];
};
