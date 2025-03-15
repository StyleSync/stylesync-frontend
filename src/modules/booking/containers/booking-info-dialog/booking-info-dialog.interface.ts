import type { ButtonVariant } from '@/modules/core/components/button/button.interface';
import type { IconName } from '@/modules/core/components/icon';

export type Action = {
  id: string;
  text: string;
  icon: IconName;
  variant: ButtonVariant;
  isLoading?: boolean;
};

export type BookingInfoDialogProps = {
  bookingId?: string | null;
  onClose: () => void;
  bookingCode?: string | null;
};
