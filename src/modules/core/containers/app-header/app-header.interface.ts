import type { Session } from 'next-auth';

export type AppHeaderProps = {
  session: Session | null;
};
