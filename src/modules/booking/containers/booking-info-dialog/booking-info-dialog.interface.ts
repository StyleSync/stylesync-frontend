import type { DialogProps } from '@/modules/core/types/dialog.types';

export type IconType = 'phone' | 'time' | 'close';
export type VariantType = 'secondary' | 'danger';

export type Action = {
  id: string;
  text: string;
  icon: IconType;
  variant: VariantType;
};

export type BookingInfoDialogProps = DialogProps & {
  name: string;
  serviceName: string;
  email: string | null;
  phone: string;
  startDate: string;
  startTime: string;
  comment?: string | null;
};
