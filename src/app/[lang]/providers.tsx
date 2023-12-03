'use client';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import { ToastProvider } from '@/modules/core/providers/toast-provider';
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';

export const Providers = ({
  session,
  children,
}: { session: Session | null } & ChildrenProp) => (
  <SessionProvider session={session}>
    <BottomFixedContent>
      <ToastProvider>{children}</ToastProvider>
    </BottomFixedContent>
  </SessionProvider>
);
