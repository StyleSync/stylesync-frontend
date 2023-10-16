'use client';
import clsx from 'clsx';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';

import type { ProfileSettingsNavigationProps } from './profile-settings.interface';
import styles from './profile-settings-navigation.module.scss';

const menuItems: ProfileSettingsNavigationProps[] = [
  { id: 'about', icon: 'info', title: 'About' },
  { id: 'portfolio', icon: 'folder', title: 'Portfolio' },
  { id: 'services', icon: 'beauty-service', title: 'Services' },
  { id: 'schedule', icon: 'calendar', title: 'Schedule' },
  { id: 'location', icon: 'location', title: 'Location' },
];

const initialTab = 'about';

export const ProfileSettingsNavigation = () => {
  const { queryParams, setQueryParams } = useQueryParams<{ step: string }>();

  // memo
  const activeTab = queryParams.step ?? initialTab;

  return (
    <div className={styles.menu}>
      <div className={styles.menuHeader}>
        <div className={styles.menuHeaderAvatar}>
          <Avatar size='medium' />
        </div>
        <div className={styles.menuHeaderName}>
          <Typography className={styles.headerTitle} variant='title'>
            Gloria Dallas
          </Typography>
        </div>
        <div className={styles.menuHeaderEmail}>
          <Typography className={styles.email} variant='small'>
            gloria_dalas@gmail.com
          </Typography>
        </div>
        <div className={styles.menuHeaderNumber}>
          <Typography className={styles.number} variant='small'>
            +38 099 022 78 56
          </Typography>
        </div>
      </div>

      <div className={styles.menuTabs}>
        {menuItems.map(({ id, icon, title }) => (
          <Button
            className={clsx(styles.menuTab, {
              [styles.active]: id === activeTab,
            })}
            key={id}
            variant='unstyled'
            icon={icon}
            text={title}
            onClick={() => {
              setQueryParams({ step: id });
            }}
          />
        ))}
      </div>

      <Typography className={styles.menuPolicy} variant='body2'>
        <span>Terms of Service</span> and <span>Privacy Policy</span>
      </Typography>
    </div>
  );
};
