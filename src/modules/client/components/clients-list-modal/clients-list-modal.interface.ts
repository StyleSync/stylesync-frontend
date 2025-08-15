import { AppRouterOutputs } from '@/server/types';

export type ClientsListModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClientClick: (client: AppRouterOutputs['client']['get']) => void;
};
