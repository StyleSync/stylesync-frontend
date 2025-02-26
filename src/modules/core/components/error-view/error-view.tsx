'use client';
import { type FC } from 'react';

import clsx from 'clsx';

import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { ErrorViewProps } from './error-view.interface';

import styles from './error-view.module.scss';

export const ErrorView: FC<ErrorViewProps> = ({
  className,
  title,
  description,
  errorCode = '404',
  primaryAction,
  secondaryAction,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.content}>
        <Typography className={styles.errorCode}>{errorCode}</Typography>
        <Typography variant='title' weight='semibold' className={styles.title}>
          {title}
        </Typography>
        <Typography variant='body1' className={styles.description}>
          {description}
        </Typography>
        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction && (
              <Button
                variant='secondary'
                text={primaryAction.text}
                onClick={primaryAction.onClick}
              />
            )}
            {secondaryAction && (
              <Button
                variant='outlined'
                text={secondaryAction.text}
                onClick={secondaryAction.onClick}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
