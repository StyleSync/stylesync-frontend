import { type ButtonVariant } from '@/modules/core/components/button/button.interface';

export type CreateBookingProps = {
  isLoadingTrigger?: boolean;
  btnVariant?: ButtonVariant;
  selectedService?: string;
};
