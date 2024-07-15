'use client';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { ChildrenProp } from '@/modules/core/types/react.types';
import { ToastProvider } from '@/modules/core/providers/toast-provider';
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ProfessionalSearchProvider } from '@/modules/user/providers/professional-search-provider';

export const Providers = ({
  session,
  children,
}: { session: Session | null } & ChildrenProp) => (
  <SessionProvider session={session}>
    <BottomFixedContent>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ToastProvider>
          <ProfessionalSearchProvider>{children}</ProfessionalSearchProvider>
        </ToastProvider>
      </LocalizationProvider>
    </BottomFixedContent>
  </SessionProvider>
);
