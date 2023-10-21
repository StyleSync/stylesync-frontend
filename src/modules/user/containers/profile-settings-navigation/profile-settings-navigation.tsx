'use client';
import clsx from 'clsx';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Emoji } from '@/modules/core/components/emoji';
// hooks
import { useProfileSettingsMenu } from '@/modules/user/hooks/use-profile-settings-menu';

import type { MenuItem } from './profile-settings.interface';
import styles from './profile-settings-navigation.module.scss';

const menuItems: MenuItem[] = [
  { id: 'about', title: 'About', icon: 'info' },
  { id: 'services', icon: 'beauty-service', title: 'Services' },
  { id: 'schedule', icon: 'calendar', title: 'Schedule' },
  { id: 'gallery', icon: 'folder', title: 'Gallery' },
  { id: 'location', icon: 'location', title: 'Location' },
];

export const profileSettingMenuDefaultItemKey = 'about';

export const ProfileSettingsNavigation = () => {
  const { activeMenuItem, setActiveMenuItem } = useProfileSettingsMenu();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.info}>
          <Avatar
            size='medium'
            fallback={<Emoji name='sunglasses' width={40} height={40} />}
            shadow
          />
          <Typography
            className={styles.headerTitle}
            variant='subtitle'
            weight='medium'
          >
            Gloria Dallas
          </Typography>
        </div>
        <div className={styles.menu}>
          {menuItems.map(({ id, icon, title }) => (
            <Button
              className={clsx(styles.link, {
                [styles.active]: id === activeMenuItem,
              })}
              key={id}
              variant='unstyled'
              icon={icon}
              text={title}
              onClick={() => setActiveMenuItem(id)}
              typographyProps={{
                weight: 'medium',
              }}
            />
          ))}
        </div>
        <Typography className={styles.policy} variant='body2'>
          <span className='link'>Terms of Service</span> and{' '}
          <span className='link'>Privacy Policy</span>
        </Typography>
      </div>
    </div>
  );
};
