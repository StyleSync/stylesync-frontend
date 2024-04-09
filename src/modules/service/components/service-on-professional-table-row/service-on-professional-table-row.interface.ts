import type { ServiceOnProfessional } from '@/modules/service/types/service.types';
import type { Session } from 'next-auth';
import type { Prisma } from '@prisma/client';

export type ServiceOnProfessionalTableRowProps = {
  data: ServiceOnProfessional;
  session: Session | null;
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
