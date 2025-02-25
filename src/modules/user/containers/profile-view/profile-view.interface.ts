import type { Session } from 'next-auth';

export type ProfileViewProps = {
  session: Session | null;
};
