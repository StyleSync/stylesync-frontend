import type { Service, Prisma } from '@prisma/client';
import type { ServiceOnProfessional } from '@/modules/service/types/service.types';
import type { Session } from 'next-auth';

export type ServicesTableProps = {
  service: Service;
  serviceOnProfessionalList: ServiceOnProfessional[];
  session: Session | null;
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
