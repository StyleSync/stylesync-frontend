'use client';
import { type FC, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from './user-header-navigation.module.scss';
import type { Session } from 'next-auth';

export const UserHeaderNavigation: FC<{
  session: Session | null;
}> = ({ session }) => {
  const intl = useIntl();
  const pathname = usePathname();
  const userLinks = useMemo(() => {
    const links = [
      // public links
      {
        href: '/app/search-pro',
        title: 'Find Pro',
      },
    ];

    if (session) {
      links.unshift(
        ...[
          {
            href: `/app/profile/${session.user.id}`,
            title: intl.formatMessage({ id: 'user.header.navigation.profile' }),
          },
          {
            href: '/app/my-bookings',
            title: intl.formatMessage({
              id: 'user.header.navigation.myBookings',
            }),
          },
        ]
      );
    }

    return links;
  }, [session, intl]);

  return (
    <div className={styles.root}>
      {userLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          prefetch={false}
          className={clsx('link', styles.link, {
            [styles.active]: pathname.endsWith(link.href),
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
