// containers
import { Header } from '@/modules/core/components/header';
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

export default function AppLayout({ children }: ChildrenProp) {
  return (
    <>
      <Header rightSlot={<UserMenuBadge />} />
      {children}
    </>
  );
}
