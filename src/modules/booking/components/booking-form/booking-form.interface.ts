import { type BookingFormValue } from './booking-form';

export type BookingFormProps = {
  onSubmit: (data: BookingFormValue) => void;
  formId?: string;
};
