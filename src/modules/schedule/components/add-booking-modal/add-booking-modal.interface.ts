import { type AvailableBookingTime } from '@/server/types';

export type AddBookingRequestData = {
  serviceOnProfessional: string;
  selectedDay: string;
  startTime: AvailableBookingTime;
  duration: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
};

export type AddBookingModalProps = {};
