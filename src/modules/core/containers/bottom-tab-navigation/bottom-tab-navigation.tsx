'use client';
import { type FC, useMemo } from 'react';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useEffectOnce } from 'usehooks-ts';
import { useSession } from 'next-auth/react';
// components
import { Button } from '@/modules/core/components/button';
// types
import type { IconName } from '@/modules/core/components/icon';

import type { BottomTabNavigationProps } from './bottom-tab-navigation.interface';
import styles from './bottom-tab-navigation.module.scss';

export const BottomTabNavigation: FC<BottomTabNavigationProps> = () => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const userLinks = useMemo<{ href: string; title: string; icon: IconName }[]>(
    () => [
      {
        href: `/app/profile/${session.data?.user?.id}`,
        icon: 'user',
        title: 'Profile',
      },
      {
        href: '/app/my-bookings',
        icon: 'list',
        title: 'My bookings',
      },
      {
        href: '/app/settings',
        icon: 'settings',
        title: 'Settings',
      },
    ],
    [session.data]
  );

  useEffectOnce(() => {
    userLinks.forEach((link) => {
      router.prefetch(link.href);
    });
  });

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {userLinks.map((link) => (
          <Button
            key={link.href}
            className={clsx(styles.tab, {
              [styles.active]: pathname.endsWith(link.href),
            })}
            icon={link.icon}
            text={link.title}
            onClick={() => router.push(link.href)}
            variant='unstyled'
            rippleColor='transparent'
          />
        ))}
      </div>
    </div>
  );
};
