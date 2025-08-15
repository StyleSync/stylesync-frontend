import type { DialogProps } from '@/modules/core/types/dialog.types';
import { AppRouterOutputs } from '@/server/types';

export type AddNewBookingModalProps = DialogProps & {
  selectedClient: AppRouterOutputs['client']['get'] | null;
  setSelectedClient?: (
    client: AppRouterOutputs['client']['get'] | null
  ) => void;
};
