import type { Service, Prisma } from '@prisma/client';
import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

export type ServicesTableProps = {
  service: Service;
  serviceOnProfessionalList: ServiceOnProfessional[];
  isOwn: boolean;
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
