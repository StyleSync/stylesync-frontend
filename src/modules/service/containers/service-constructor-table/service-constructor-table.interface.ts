import type { Service } from '@prisma/client';

import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

export type ServiceConstructorTableProps = {
  service: Service;
  serviceOnProfessionalList: ServiceOnProfessional[];
  onRemove: (service: Service) => void;
};
