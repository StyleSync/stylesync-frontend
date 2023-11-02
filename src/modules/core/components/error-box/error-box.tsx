import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';
import { Button } from '@/modules/core/components/button';

import type { ErrorBoxProps } from './error-box.interface';
import styles from './error-box.module.scss';

export const ErrorBox: FC<ErrorBoxProps> = ({
  title,
  description,
  refresh,
}) => {
  return (
    <div className={styles.root}>
      <Icon className={styles.icon} name='alert-triangle' />
      {!!title && (
        <Typography className={styles.title} weight='medium' variant='body1'>
          {title}
        </Typography>
      )}
      {!!description && (
        <Typography className={styles.description} variant='small'>
          {description}
        </Typography>
      )}
      <div className={styles.actions}>
        {!!refresh && (
          <Button
            className={styles.action}
            text='Refresh'
            icon='refresh-ccw'
            variant='secondary'
            onClick={refresh}
          />
        )}
        <Button
          className={clsx(styles.action, styles.support)}
          text='Support'
          icon='shield'
          variant='secondary'
          onClick={refresh}
        />
      </div>
    </div>
  );
};
