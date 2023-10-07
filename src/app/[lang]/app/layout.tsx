// containers
import { Header } from '@/modules/core/components/header';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

export default function AppLayout({ children }: ChildrenProp) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
