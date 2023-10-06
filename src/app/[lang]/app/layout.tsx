// containers
import { Header } from '@/modules/core/components/header';
import { AppHeaderRightAdornment } from '@/modules/core/containers/app-header-right-adornment';
import { UserHeaderNavigationLinks } from '@/modules/core/containers/user-header-navigation-links';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

export default function AppLayout({ children }: ChildrenProp) {
  return (
    <>
      <Header
        centralSlot={<UserHeaderNavigationLinks />}
        rightSlot={<AppHeaderRightAdornment />}
      />
      {children}
    </>
  );
}
