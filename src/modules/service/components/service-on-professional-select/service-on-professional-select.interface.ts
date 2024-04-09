import type { Prisma } from '@prisma/client';

export type ServiceOnProfessionalSelectProps = {
  value: string;
  onChange: (value: string) => void;
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
