import type { Prisma } from '@prisma/client';

export type ProfessionalSearchCardProps = {
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
