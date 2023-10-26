'use client';
import { type FC } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
// components
import { Placeholder } from '@/modules/core/components/placeholder';
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
  const session = useSession();
  const pathname = usePathname();

  if (session.status === 'unauthenticated') {
    return null;
  }

  if (session.status === 'authenticated') {
    const { onboardingCompleted, userType } = session.data.user;

    if (!onboardingCompleted || !userType) {
      return null;
    }
  }

  return (
    <div className={styles.root}>
      <Placeholder
        className={styles.loadingPlaceholder}
        isActive={session.status === 'loading'}
        placeholder={
          <div className={styles.skeleton}>
            <div className='skeleton' />
            <div className='skeleton' />
          </div>
        }
      >
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
      </Placeholder>
    </div>
  );
};
