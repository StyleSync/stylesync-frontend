import type { ReactNode } from 'react';
// components
import { AuthLayout } from '@/modules/auth/components/auth-layout';

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
