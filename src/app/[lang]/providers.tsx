'use client';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
import { ToastProvider } from '@/modules/core/providers/toast-provider';
import type { ChildrenProp } from '@/modules/core/types/react.types';
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
