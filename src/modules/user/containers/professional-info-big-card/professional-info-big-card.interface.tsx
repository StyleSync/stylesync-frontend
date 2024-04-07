import type { Session } from 'next-auth';
import type { Prisma } from '@prisma/client';

export type ProfileInfoBigCardProps = {
  userId: string;
  session: Session | null;
};

export type ProDataProps = {
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
  session: Session | null;
};

export type UserDataProps = {
  professional: Prisma.ProfessionalGetPayload<{
    include: { user: true };
  }>;
};
