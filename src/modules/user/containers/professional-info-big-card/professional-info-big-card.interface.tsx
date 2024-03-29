import type { Session } from 'next-auth';

export type ProfileInfoBigCardProps = {
  userId: string;
  session: Session | null;
};
