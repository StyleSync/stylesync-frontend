import type { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Leveraged by session callback's user object (AdapterUser extends User)
   */
  export interface User extends DefaultUser {
    onboardingCompleted: null | boolean;
    userType: null | 'CUSTOMER' | 'PROFESSIONAL';
    nickname?: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session extends DefaultSession {
    user: User; // todo: probably it's a wrong type because of `...session.user`
  }
}
