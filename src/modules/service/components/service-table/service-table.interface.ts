import type { Service, Prisma } from '@prisma/client';
import type { ServiceOnProfessionalList } from '@/modules/service/types/service.types';

export type ServicesTableProps = {
  service: Service;
  serviceOnProfessionalList: ServiceOnProfessionalList;
  isOwn: boolean;
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
