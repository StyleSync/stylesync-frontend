import type { Prisma } from '@prisma/client';
import type { ServiceOnProfessionalListItem } from '@/modules/service/types/service.types';

export type ServiceOnProfessionalSelectProps = {
  value: ServiceOnProfessionalListItem | null;
  onChange: (value: ServiceOnProfessionalListItem) => void;
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
