import type { Service } from '@prisma/client';
import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

export type ServicesTableProps = {
  service: Service;
  serviceOnProfessionalList: ServiceOnProfessional[];
};
