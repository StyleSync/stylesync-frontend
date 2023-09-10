'use client';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { ChildrenProp } from '@/modules/core/types/react.types';

export const Providers = ({
  session,
  children,
}: { session: Session | null } & ChildrenProp) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);
