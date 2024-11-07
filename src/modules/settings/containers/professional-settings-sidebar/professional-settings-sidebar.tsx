'use client';
import { type FC, useMemo, type ReactNode } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';

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
import { LocaleSelect } from '@/modules/internationalization/components/locale-select';

export const ProfessionalSettingsSidebar: FC<UserSettingsSidebarProps> = () => {
  const intl = useIntl();

  const { active, defaultTab, set } = useSettingsNavigation();
  const deviceType = useDeviceType();
  // queries
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  // memo
  const linkGroups: SidebarLinkGroup[] = useMemo(() => {
    if (me?.userType !== 'PROFESSIONAL') {
      return [
        {
          id: 'profile',
          title: intl.formatMessage({
            id: 'professional.settings.sidebar.profile',
          }),
          links: [
            {
              id: 'about',
              name: intl.formatMessage({
                id: 'professional.settings.sidebar.about',
              }),
              icon: 'info',
            },
          ],
        },
        {
          id: 'app',
          title: intl.formatMessage({
            id: 'professional.settings.sidebar.language',
          }),
          links: [
            {
              id: 'language',
              icon: 'flag-ukraine',
              renderItem: () => {
                return <LocaleSelect />;
              },
            },
          ],
        },
      ];
    }

    return [
      {
        id: 'profile',
        title: intl.formatMessage({
          id: 'professional.settings.sidebar.profile',
        }),
        links: [
          {
            id: 'services',
            name: intl.formatMessage({
              id: 'professional.settings.sidebar.services',
            }),
            icon: 'beauty-service',
          },
          {
            id: 'schedule',
            name: intl.formatMessage({
              id: 'professional.settings.sidebar.schedule',
            }),
            icon: 'calendar',
          },
          {
            id: 'about',
            name: intl.formatMessage({
              id: 'professional.settings.sidebar.about',
            }),
            icon: 'info',
          },
          {
            id: 'gallery',
            name: intl.formatMessage({
              id: 'professional.settings.sidebar.gallery',
            }),
            icon: 'folder',
          },
          {
            id: 'location',
            name: intl.formatMessage({
              id: 'professional.settings.sidebar.location',
            }),
            icon: 'location',
          },
        ],
      },
      {
        id: 'app',
        title: intl.formatMessage({
          id: 'professional.settings.sidebar.language',
        }),
        links: [
          {
            id: 'language',
            icon: 'flag-ukraine',
            renderItem: () => {
              return <LocaleSelect />;
            },
          },
        ],
      },
    ];
  }, [intl, me?.userType]);

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
