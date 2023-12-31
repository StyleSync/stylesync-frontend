'use client';
import { type FC, useMemo, type ReactNode } from 'react';
import clsx from 'clsx';
// components
import { Sidebar } from '@/modules/core/components/sidebar';
import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
// hooks
import { useSettingsNavigation } from '@/modules/user/hooks/use-settings-navigation';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { getFullName } from '@/modules/user/utils/user.utils';
// types
import type { SidebarLinkGroup } from '@/modules/core/components/sidebar/sidebar.interface';

import type { UserSettingsSidebarProps } from './professional-settings-sidebar.interface';
import styles from './professional-settings-sidebar.module.scss';

const linkGroups: SidebarLinkGroup[] = [
  {
    id: 'profile',
    title: 'Profile',
    links: [
      {
        id: 'services',
        name: 'Services',
        icon: 'beauty-service',
      },
      {
        id: 'schedule',
        name: 'Schedule',
        icon: 'calendar',
      },
      {
        id: 'about',
        name: 'About',
        icon: 'info',
      },
      {
        id: 'gallery',
        name: 'Gallery',
        icon: 'folder',
      },
      {
        id: 'location',
        name: 'Location',
        icon: 'location',
      },
    ],
  },
  {
    id: 'app',
    title: 'Application',
    links: [
      {
        id: 'language',
        name: 'Language',
        icon: 'flag-ukraine',
      },
    ],
  },
];

export const ProfessionalSettingsSidebar: FC<UserSettingsSidebarProps> = () => {
  const { active, defaultTab, set } = useSettingsNavigation();
  const deviceType = useDeviceType();
  // queries
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  // memo
  const topSlot = useMemo<ReactNode[] | undefined>(() => {
    if (deviceType === 'mobile') {
      return;
    }

    return [
      <div key='info' className={styles.info}>
        <Placeholder
          className={clsx('skeleton', styles.avatarSkeleton)}
          isActive={meQuery.isLoading}
          placeholder={null}
        >
          <Avatar
            className={styles.avatar}
            size={70}
            shape='circle'
            url={me?.avatar}
            shadow
          />
        </Placeholder>
        <div className={styles.name}>
          <Placeholder
            className={clsx('skeleton', styles.titleSkeleton)}
            isActive={meQuery.isLoading}
            placeholder={null}
          >
            <Typography
              className={styles.title}
              variant='body1'
              weight='medium'
            >
              {getFullName(me ?? {})}
            </Typography>
          </Placeholder>
          <Placeholder
            className={clsx('skeleton', styles.metaSkeleton)}
            isActive={meQuery.isLoading}
            placeholder={null}
          >
            <Typography
              className={styles.meta}
              variant='small'
              weight='regular'
              cutText
            >
              {me?.email}
            </Typography>
          </Placeholder>
        </div>
      </div>,
    ];
  }, [deviceType, me, meQuery.isLoading]);

  return (
    <Sidebar
      activeLink={active ?? defaultTab}
      linkGroups={linkGroups}
      onSelect={({ id }) => set(id)}
      slots={{
        top: topSlot,
      }}
    />
  );
};
