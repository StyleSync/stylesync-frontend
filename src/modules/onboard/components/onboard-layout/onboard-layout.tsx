import { type FC, Fragment } from 'react';
import { useIntl } from 'react-intl';

// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
// containers
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';

import type { OnboardLayoutProps } from './onboard-layout.interface';
import styles from './onboard-layout.module.scss';

export const OnboardLayout: FC<OnboardLayoutProps> = ({
  children,
  meta,
  prevButtonProps,
  nextButtonProps,
}) => {
  const intl = useIntl();

  const deviceType = useDeviceType();
  const ActionsContainer =
    deviceType === 'mobile' ? BottomFixedContent.Item : Fragment;

  return (
    <div className={styles.root}>
      {meta && (
        <div className={styles.mobileInfo}>
          <Typography variant='body1'>{meta.title}</Typography>
        </div>
      )}
      {children}
      <ActionsContainer orderIndex={1}>
        <div className={styles.actions}>
          {prevButtonProps && (
            <Button
              className={styles.action}
              text={intl.formatMessage({ id: 'button.back' })}
              variant='secondary'
              {...prevButtonProps}
            />
          )}
          <Button
            className={styles.action}
            text={intl.formatMessage({ id: 'button.next' })}
            {...nextButtonProps}
          />
        </div>
      </ActionsContainer>
    </div>
  );
};
