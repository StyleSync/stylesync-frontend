'use client';
import { type FC, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { useIntl } from 'react-intl';
// containers
import { BookingsBadge } from '@/modules/booking/containers/bookings-badge/bookings-badge';

// components
import { Typography } from '@/modules/core/components/typogrpahy';

import styles from './user-header-navigation.module.scss';
import type { Session } from 'next-auth';
import { ProSearchField } from '@/modules/location/components/pro-search-field';
import { Icon, type IconName } from '@/modules/core/components/icon';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

export const UserHeaderNavigation: FC<{
  session: Session | null;
}> = ({ session }) => {
  const intl = useIntl();
  const pathname = usePathname();
  // queries
  const { data: me } = trpc.user.me.useQuery();

  const userLinks = useMemo(() => {
    if (!me?.onboardingCompleted) {
      return [];
    }

    if (session && me?.userType === 'PROFESSIONAL') {
      return [
        {
          icon: 'user',
          href: `/app/profile/${me?.nickname || session.user.id}`,
          title: intl.formatMessage({ id: 'user.header.navigation.profile' }),
        },
        {
          icon: 'calendar',
          href: '/app/my-bookings',
          title: intl.formatMessage({
            id: 'user.header.navigation.myBookings',
          }),
          badge: <BookingsBadge />,
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

    return [
      {
        icon: 'calendar',
        href: '/app/my-bookings',
        title: intl.formatMessage({
          id: 'user.header.navigation.myBookings',
        }),
        badge: <BookingsBadge />,
      },
      {
        icon: 'search',
        href: '/app/search-pro',
        title: intl.formatMessage({
          id: 'user.header.navigation.search',
        }),
      },
    ];
  }, [session, intl, me?.userType, me?.onboardingCompleted]);

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
          {link.badge && (
            <div className='absolute -right-[15px] -top-[7px]'>
              {link.badge}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};
