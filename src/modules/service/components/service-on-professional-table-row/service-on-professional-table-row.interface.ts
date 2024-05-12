import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

import type { Prisma } from '@prisma/client';

export type ServiceOnProfessionalTableRowProps = {
  data: ServiceOnProfessional;
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
  isOwn: boolean;
};
