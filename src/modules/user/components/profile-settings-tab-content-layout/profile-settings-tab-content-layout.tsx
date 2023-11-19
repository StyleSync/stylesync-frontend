import { type FC } from 'react';
// components
import { Divider } from '@/modules/core/components/divider';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';

import type { ProfileSettingsTabContentLayoutProps } from './profile-settings-tab-content-layout.interface';
import styles from './profile-settings-tab-content-layout.module.scss';

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
      <div className={styles.content}>
        <div className={styles.scrolledContent}>
          <div className={styles.childrenWrapper}>{children}</div>
        </div>
        {actions && (
          <>
            <Divider className={styles.divider} variant='horizontal' />
            <div className={styles.actions}>
              {actions.map((action, index) => (
                <Button key={index} {...action} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
