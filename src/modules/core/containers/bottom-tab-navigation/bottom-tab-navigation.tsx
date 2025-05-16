'use client';
import { type FC, type ReactNode, useMemo } from 'react';

import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useIntl } from 'react-intl';

import { BookingsBadge } from '@/modules/booking/containers/bookings-badge/bookings-badge';
import { Button } from '@/modules/core/components/button';
import type { IconName } from '@/modules/core/components/icon';
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useQueryParams } from '@/modules/core/hooks/use-search-params';
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { BottomTabNavigationProps } from './bottom-tab-navigation.interface';

import styles from './bottom-tab-navigation.module.scss';

export const BottomTabNavigation: FC<BottomTabNavigationProps> = () => {
  const deviceType = useDeviceType();
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const intl = useIntl();
  const { clearAllQueryParams } = useQueryParams();

  const { data: me } = trpc.user.me.useQuery(
    { expand: [] },
    {
      enabled: session.status === 'authenticated',
    }
  );

  const userLinks = useMemo<
    { href: string; title: string; icon: IconName; slotEnd?: ReactNode }[]
  >(() => {
    if (!me) return [];

    if (me.userType === 'CUSTOMER') {
      return [
        {
          href: '/app/my-bookings',
          icon: 'list',
          title: intl.formatMessage({ id: 'burger.menu.btn.myBookings' }),
          slotEnd: (
            <BookingsBadge className='absolute left-[calc(50%+2px)] top-[4px]' />
          ),
        },
        // {
        //   href: '/app/search-pro',
        //   icon: 'search',
        //   title: intl.formatMessage({ id: 'user.header.navigation.search' }),
        // },
        {
          href: '/app/settings',
          icon: 'settings',
          title: intl.formatMessage({ id: 'burger.menu.btn.settings' }),
        },
      ];
    }

    return [
      {
        href: `/app/profile/${me.nickname || me.id}`,
        icon: 'user',
        title: intl.formatMessage({ id: 'burger.menu.btn.myProfile' }),
      },
      {
        href: '/app/my-bookings',
        icon: 'list',
        title: intl.formatMessage({ id: 'burger.menu.btn.myBookings' }),
        slotEnd: (
          <BookingsBadge className='absolute left-[calc(50%+2px)] top-[4px]' />
        ),
      },
      // {
      //   href: '/app/search-pro',
      //   icon: 'search',
      //   title: intl.formatMessage({ id: 'user.header.navigation.search' }),
      // },
      {
        href: '/app/settings',
        icon: 'settings',
        title: intl.formatMessage({ id: 'burger.menu.btn.settings' }),
      },
    ];
  }, [me, intl]);

  if (
    deviceType !== 'mobile' ||
    session.status === 'loading' ||
    !session.data?.user.onboardingCompleted ||
    !userLinks.length
  ) {
    return;
  }

  return (
    <BottomFixedContent.Item orderIndex={0}>
      <div className={styles.root}>
        {userLinks.map((link) => {
          const isActive = pathname.endsWith(link.href);

          return (
            <Button
              key={link.href}
              className={clsx(styles.tab, {
                [styles.active]: isActive,
              })}
              icon={link.icon}
              text={link.title}
              onClick={() => {
                if (isActive) {
                  clearAllQueryParams();
                }

                router.replace(link.href);
              }}
              variant='unstyled'
              rippleColor='transparent'
              slotEnd={link.slotEnd}
            />
          );
        })}
      </div>
    </BottomFixedContent.Item>
  );
};
