import { type FC } from 'react';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { OnboardLayoutProps } from './onboard-layout.interface';
import styles from './onboard-layout.module.scss';

export const OnboardLayout: FC<OnboardLayoutProps> = ({
  children,
  meta,
  prevButtonProps,
  nextButtonProps,
}) => {
  return (
    <div className={styles.root}>
      {meta && (
        <div className={styles.mobileInfo}>
          <Typography variant='subtitle'>{meta.title}</Typography>
          <Typography As='p' variant='small'>
            {meta.description}
          </Typography>
        </div>
      )}
      {children}
      <div className={styles.actions}>
        {prevButtonProps && (
          <Button
            className={styles.action}
            text='Back'
            variant='secondary'
            {...prevButtonProps}
          />
        )}
        <Button className={styles.action} text='Next' {...nextButtonProps} />
      </div>
    </div>
  );
};
