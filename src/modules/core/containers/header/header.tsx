'use client';
import { type FC } from 'react';
// components
import { Button, Icon, Typography } from '@/modules/core/components';

import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.root}>
      <Icon name='stylesync-logo' width={150} />
      <div className={styles.right}>
        <Typography className={styles.text}>
          Already have an account?
        </Typography>
        <Button text='Log in' variant='secondary' />
      </div>
    </header>
  );
};
