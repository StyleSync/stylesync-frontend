import { type FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
// components
import { Divider } from '@/modules/core/components/divider';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
import { Spinner } from '@/modules/core/components/spinner';
import { Placeholder } from '@/modules/core/components/placeholder';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { useSettingsNavigation } from '@/modules/user/hooks/use-settings-navigation';
// type
import type { ProfileSettingsTabContentLayoutProps } from './profile-settings-tab-content-layout.interface';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
// style
import styles from './profile-settings-tab-content-layout.module.scss';

export const ProfileSettingsTabContentLayout: FC<
  ProfileSettingsTabContentLayoutProps
> = ({ icon, title, actions, isLoading = false, hideActions, children }) => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  const { reset } = useSettingsNavigation();
  // memo
  const _actions = useMemo<ButtonProps[]>(() => {
    if (deviceType === 'mobile') {
      return [
        {
          text: intl.formatMessage({ id: 'button.back' }),
          variant: 'secondary',
          onClick: reset,
        },
        ...(actions ?? []),
      ];
    }

    return actions ?? [];
  }, [actions, deviceType, reset, intl]);

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
