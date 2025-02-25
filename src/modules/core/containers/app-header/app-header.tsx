'use client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import { Header } from '@/modules/core/components/header';
import { UserHeaderNavigation } from '@/modules/core/containers/user-header-navigation/user-header-navigation';
import { UserMenuBadge } from '@/modules/user/containers/user-menu-badge';

import { type AppHeaderProps } from './app-header.interface';

export const AppHeader: FC<AppHeaderProps> = ({ session }) => {
  const pathname = usePathname();

  return (
    <Header
      classes={{
        leftSlot: clsx({
          '!flex-[unset]': !session || pathname.includes('app/search-pro'),
        }),
        centralSlot: clsx({
          '!pl-14 !max-w-[unset] hidden lg:block':
            !session || pathname.includes('app/search-pro'),
        }),
      }}
      centralSlot={<UserHeaderNavigation session={session} />}
      rightSlot={<UserMenuBadge session={session} />}
    />
  );
};
