import { type FC } from 'react';

import type { ProfileSettingsTabContentLayoutProps } from './profile-settings-tab-content-layout.interface';
import styles from './profile-settings-tab-content-layout.module.scss';
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Divider } from '@/modules/core/components/divider';

export const ProfileSettingsTabContentLayout: FC<
  ProfileSettingsTabContentLayoutProps
> = ({ icon, title, actions, children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {icon && <Icon name={icon} />}
        <Typography variant='body1' weight='medium'>
          {title}
        </Typography>
      </div>
      <Divider variant='horizontal' />
      <div className={styles.content}>
        <div className={styles.scrolledContent}>{children}</div>
      </div>
      {actions && (
        <>
          <Divider variant='horizontal' />
          <div className={styles.actions}>
            {actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
