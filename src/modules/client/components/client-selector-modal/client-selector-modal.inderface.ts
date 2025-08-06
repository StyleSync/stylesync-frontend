import { ServiceOnProfessional } from '@/modules/service/types/service.types';

export type ClientSelectorModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onServiceSelect: (service: ServiceOnProfessional) => void;
};
