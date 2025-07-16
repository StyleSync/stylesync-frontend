import type { DialogProps } from '@/modules/core/types/dialog.types';

export type ClientsDetailProps = DialogProps & {
  clientId: string | null;
  onAddBooking?: () => void;
  onEditClientInfo?: () => void;
};
