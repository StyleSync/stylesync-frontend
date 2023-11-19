'use client';
import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Sidebar } from '@/modules/core/components/sidebar';
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Placeholder } from '@/modules/core/components/placeholder';
// hooks
import { useSettingsNavigation } from '@/modules/user/hooks/use-settings-navigation';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// types
import type { SidebarLinkGroup } from '@/modules/core/components/sidebar/sidebar.interface';

import type { UserSettingsSidebarProps } from './professional-settings-sidebar.interface';
import styles from './professional-settings-sidebar.module.scss';
import { getFullName } from '@/modules/user/utils/user.utils';

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
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const { active, set } = useSettingsNavigation();

  return (
    <Sidebar
      activeLink={active}
      linkGroups={linkGroups}
      onSelect={({ id }) => set(id)}
      slots={{
        top: [
          <div key='info' className={styles.info}>
            <Placeholder
              className={clsx('skeleton', styles.avatarSkeleton)}
              isActive={meQuery.isLoading}
              placeholder={null}
            >
              <Avatar
                className={styles.avatar}
                size='medium'
                shape='rect'
                fallback={<Emoji name='sunglasses' width={50} height={60} />}
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
        ],
      }}
    />
  );
};
