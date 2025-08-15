import type {
  ServiceOnProfessional,
  ServiceOnProfessionalGroup,
} from '@/modules/service/types/service.types';

export type ClientSelectorServicesProps = {
  serviceOnProfessionalGroups: ServiceOnProfessionalGroup[];
  onServiceSelect?: (service: ServiceOnProfessional) => void;
  disabled?: boolean;
};
