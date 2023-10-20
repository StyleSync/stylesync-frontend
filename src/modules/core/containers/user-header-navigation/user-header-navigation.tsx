'use client';
import { type FC } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
// components
import { Typography } from '@/modules/core/components/typogrpahy';

import type { UserHeaderNavigationProps } from './user-header-navigation.interface';
import styles from './user-header-navigation.module.scss';

const userLinks: { href: string; title: string }[] = [
  {
    href: '/app/profile',
    title: 'Profile',
  },
  {
    href: '/app/my-bookings',
    title: 'My bookings',
  },
];

export const UserHeaderNavigation: FC<UserHeaderNavigationProps> = () => {
  const pathname = usePathname();

  return (
    <div className={styles.root}>
      {userLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx('link', styles.link, {
            [styles.active]: pathname.includes(link.href),
          })}
        >
          <Typography variant='body2' weight='medium'>
            {link.title}
          </Typography>
        </Link>
      ))}
    </div>
  );
};
