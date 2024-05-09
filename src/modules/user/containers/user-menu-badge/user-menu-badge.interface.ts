import type { Session } from 'next-auth';

export type UserMenuBadgeProps = {
  session?: Session | null;
};
