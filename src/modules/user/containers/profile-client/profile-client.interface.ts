import type { Session } from 'next-auth';

export type ProfileClientProps = {
  userId: string;
  session: Session | null;
};
