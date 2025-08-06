import { AppRouterOutputs } from '@/server/types';

export type ClientSelectorProps = {
  onSelect?: () => void;
  selectedClient?: AppRouterOutputs['client']['get'] | null;
  setSelectedClient?: (
    client: AppRouterOutputs['client']['get'] | null
  ) => void;
  disabled?: boolean;
};
