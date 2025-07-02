import { Client } from '@/modules/client/utils/sort-clients';
import type { DialogProps } from '@/modules/core/types/dialog.types';

export type ClientsDetailProps = DialogProps & {
  client: Client | null;
  onAddBooking?: () => void;
  onEditClientInfo?: () => void;
};
