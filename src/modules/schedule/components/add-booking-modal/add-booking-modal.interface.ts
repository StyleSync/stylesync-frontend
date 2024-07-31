import type { TimeValue } from '@/modules/core/utils/time.utils';

export type AddBookingRequestData = {
  serviceOnProfessional: string;
  selectedDay: string;
  date: Date;
  startTime: TimeValue;
  duration: TimeValue;
  name: string;
  lastName: string;
  phone: string;
  email: string;
};

export type AddBookingModalProps = {};
