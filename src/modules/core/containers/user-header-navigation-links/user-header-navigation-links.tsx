'use client';
import { type FC } from 'react';

import type { UserHeaderNavigationLinksProps } from './user-header-navigation-links.interface';
import styles from './user-header-navigation-links.module.scss';
import Link from 'next/link';
import { Typography } from '@/modules/core/components/typogrpahy';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { trpc } from '@/utils/trpc';

const userLinks: { href: string; title: string }[] = [
  {
    href: '/app/profile',
    title: 'My profile',
  },
  {
    href: '/app/my-bookings',
    title: 'Bookings',
  },
];

export const UserHeaderNavigationLinks: FC<
  UserHeaderNavigationLinksProps
> = () => {
  const pathname = usePathname();
  const session = useSession();

  if (session.status === 'unauthenticated' || session.status === 'loading') {
    return null;
  }

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
