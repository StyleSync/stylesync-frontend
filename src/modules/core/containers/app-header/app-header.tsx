'use client';
import { UserHeaderNavigation } from '@/modules/core/containers/user-header-navigation/user-header-navigation';
import { Header } from '@/modules/core/components/header';
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';
import clsx from 'clsx';

import { type AppHeaderProps } from './app-header.interface';
import type { FC } from 'react';
import { usePathname } from 'next/navigation';

export const AppHeader: FC<AppHeaderProps> = ({ session }) => {
  const pathname = usePathname();

  return (
    <Header
      classes={{
        leftSlot: clsx({
          '!flex-[unset]': !session || pathname.includes('app/search-pro'),
        }),
        centralSlot: clsx({
          '!pl-14 !max-w-[unset] hidden md:block':
            !session || pathname.includes('app/search-pro'),
        }),
      }}
      centralSlot={<UserHeaderNavigation session={session} />}
      rightSlot={<UserMenuBadge session={session} />}
    />
  );
};
