import type { DialogProps } from '@/modules/core/types/dialog.types';

export type BookingInfoDialogProps = DialogProps & {
  name: string;
  serviceName: string;
  email: string | null;
  phone: string;
  startDate: string;
  startTime: string;
};
