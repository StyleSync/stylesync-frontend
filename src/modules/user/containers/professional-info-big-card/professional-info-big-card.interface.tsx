import type { Session } from 'next-auth';

import type { AppRouterOutputs } from '@/server/types';

export type ProfileInfoBigCardProps = {
  userId: string;
  session: Session | null;
};

export type ProDataProps = {
  professional: AppRouterOutputs['professional']['get'];
  session: Session | null;
};

export type UserDataProps = {
  professional: AppRouterOutputs['professional']['get'];
};
