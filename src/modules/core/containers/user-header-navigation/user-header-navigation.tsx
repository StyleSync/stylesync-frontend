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
import { ProSearchField } from '@/modules/location/components/pro-search-field';
import { Icon, type IconName } from '@/modules/core/components/icon';

export const UserHeaderNavigation: FC<{
  session: Session | null;
}> = ({ session }) => {
  const intl = useIntl();
  const pathname = usePathname();
  const userLinks = useMemo(() => {
    if (session) {
      return [
        {
          icon: 'user',
          href: `/app/profile/${session.user.id}`,
          title: intl.formatMessage({ id: 'user.header.navigation.profile' }),
        },
        {
          icon: 'calendar',
          href: '/app/my-bookings',
          title: intl.formatMessage({
            id: 'user.header.navigation.myBookings',
          }),
        },
        {
          icon: 'search',
          href: '/app/search-pro',
          title: intl.formatMessage({
            id: 'user.header.navigation.search',
          }),
        },
      ];
    }

    return [];
  }, [session, intl]);

  if (!session || pathname.includes('app/search-pro')) {
    return <ProSearchField />;
  }

  return (
    <div className={styles.root}>
      {userLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          prefetch={false}
          className={clsx('link flex gap-x-2', styles.link, {
            [styles.active]: pathname.endsWith(link.href),
          })}
        >
          <Icon name={link.icon as IconName} width={16} height={16} />
          <Typography variant='body2' weight='medium'>
            {link.title}
          </Typography>
        </Link>
      ))}
    </div>
  );
};
