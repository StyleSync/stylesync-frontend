'use client';
import { type FC } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { useIntl } from 'react-intl';

// components
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from './user-header-navigation.module.scss';

export const UserHeaderNavigation: FC<{ userId: string }> = ({ userId }) => {
  const intl = useIntl();

  const pathname = usePathname();

  const userLinks = [
    {
      href: `/app/profile/${userId}`,
      title: intl.formatMessage({ id: 'user.header.navigation.profile' }),
    },
    {
      href: '/app/my-bookings',
      title: intl.formatMessage({ id: 'user.header.navigation.myBookings' }),
    },
  ];

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
