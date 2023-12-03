import { type FC, useMemo } from 'react';
// components
import { Divider } from '@/modules/core/components/divider';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';

import type { ProfileSettingsTabContentLayoutProps } from './profile-settings-tab-content-layout.interface';
import styles from './profile-settings-tab-content-layout.module.scss';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useSettingsNavigation } from '@/modules/user/hooks/use-settings-navigation';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import { Placeholder } from '@/modules/core/components/placeholder';
import { Spinner } from '@/modules/core/components/spinner';

export const ProfileSettingsTabContentLayout: FC<
  ProfileSettingsTabContentLayoutProps
> = ({ icon, title, actions, isLoading = false, hideActions, children }) => {
  const deviceType = useDeviceType();
  const { reset } = useSettingsNavigation();
  // memo
  const _actions = useMemo<ButtonProps[]>(() => {
    if (deviceType === 'mobile') {
      return [
        { text: 'Back', variant: 'secondary', onClick: reset },
        ...(actions ?? []),
      ];
    }

    return actions ?? [];
  }, [actions, deviceType, reset]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        {deviceType === 'mobile' && (
          <Button
            className={styles.backButton}
            icon='chevron-left'
            variant='secondary'
            onClick={reset}
          />
        )}
        {icon && deviceType !== 'mobile' && <Icon name={icon} />}
        <Typography variant='body1' weight='medium'>
          {title}
        </Typography>
      </div>
      <div className={styles.content}>
        <div className={styles.scrolledContent}>
          <Placeholder
            isActive={isLoading}
            placeholder={<Spinner size='medium' />}
          >
            <div className={styles.childrenWrapper}>{children}</div>
          </Placeholder>
        </div>
        {_actions.length > 0 && !hideActions && (
          <>
            <Divider className={styles.divider} variant='horizontal' />
            <div className={styles.actions}>
              {_actions.map((action, index) => (
                <Button key={index} {...action} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
