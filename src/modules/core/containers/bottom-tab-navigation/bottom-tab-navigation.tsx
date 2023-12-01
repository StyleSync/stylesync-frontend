'use client';
import { type FC } from 'react';
// components
import { Button } from '@/modules/core/components/button';
// types
import type { IconName } from '@/modules/core/components/icon';

import type { BottomTabNavigationProps } from './bottom-tab-navigation.interface';
import styles from './bottom-tab-navigation.module.scss';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useEffectOnce } from 'usehooks-ts';

const userLinks: { href: string; title: string; icon: IconName }[] = [
  {
    href: '/app/profile',
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
];

export const BottomTabNavigation: FC<BottomTabNavigationProps> = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffectOnce(() => {
    userLinks.forEach((link) => {
      router.prefetch(link.href);
    });
  });

  return (
    <div className={styles.root}>
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
  );
};
