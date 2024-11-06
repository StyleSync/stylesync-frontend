'use client';
import { type FC, useMemo } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// components
import { Button } from '@/modules/core/components/button';
// containers
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
import type { IconName } from '@/modules/core/components/icon';

import type { BottomTabNavigationProps } from './bottom-tab-navigation.interface';
import styles from './bottom-tab-navigation.module.scss';

export const BottomTabNavigation: FC<BottomTabNavigationProps> = () => {
  const deviceType = useDeviceType();
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const intl = useIntl();

  const { data: me } = trpc.user.me.useQuery(
    { expand: ['professional'] },
    {
      enabled: session.status === 'authenticated',
    }
  );

  const userLinks = useMemo<{ href: string; title: string; icon: IconName }[]>(
    () => [
      {
        href: `/app/profile/${session.data?.user?.id}`,
        icon: 'user',
        title: intl.formatMessage({ id: 'burger.menu.btn.myProfile' }),
      },
      {
        href: '/app/my-bookings',
        icon: 'list',
        title: intl.formatMessage({ id: 'burger.menu.btn.myBookings' }),
      },
      {
        href: '/app/settings',
        icon: 'settings',
        title: intl.formatMessage({ id: 'burger.menu.btn.settings' }),
      },
    ],
    [session.data, intl]
  );

  if (!me?.professional) {
    return;
  }

  if (deviceType !== 'mobile') {
    return;
  }

  return (
    <BottomFixedContent.Item orderIndex={0}>
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
    </BottomFixedContent.Item>
  );
};
