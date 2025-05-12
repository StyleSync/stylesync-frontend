import { type FC } from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { ErrorBoxProps } from './error-box.interface';

import styles from './error-box.module.scss';

export const ErrorBox: FC<ErrorBoxProps> = ({
  title,
  description,
  refresh,
}) => {
  const intl = useIntl();

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
            text={intl.formatMessage({ id: 'button.refresh' })}
            icon='refresh-ccw'
            variant='secondary'
            onClick={refresh}
          />
        )}
        <Button
          className={clsx(styles.action, styles.support)}
          text={intl.formatMessage({ id: 'button.support' })}
          icon='shield'
          variant='secondary'
          onClick={refresh}
        />
      </div>
    </div>
  );
};
