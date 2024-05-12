import type { Session } from 'next-auth';

export type UserServicesProps = {
  userId: string;
  session: Session | null;
};
