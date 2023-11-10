import type { ServiceOnProfessional } from '@/modules/service/types/service.types';
import type { Service } from '@prisma/client';

export type ServiceConstructorTableProps = {
  service: Service;
  serviceOnProfessionalList: ServiceOnProfessional[];
  onChange: (
    service: Service,
    serviceOnProfessionalList: ServiceOnProfessional[]
  ) => void;
  onRemoveClick: (service: Service) => void;
};
