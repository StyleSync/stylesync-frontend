// containers
import { Header } from '@/modules/core/components/header';
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';
import { UserHeaderNavigation } from '@/modules/core/containers/user-header-navigation';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

export default function AppLayout({ children }: ChildrenProp) {
  return (
    <>
      <Header
        centralSlot={<UserHeaderNavigation />}
        rightSlot={<UserMenuBadge />}
      />
      {children}
    </>
  );
}
