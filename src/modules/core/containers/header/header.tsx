'use client';
import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Button, Icon, Typography } from '@/modules/core/components';
// types
import type { StylingProps } from '@/styles/styles.types';

import styles from './header.module.scss';

export const Header: FC<StylingProps> = ({ style, className }) => {
  return (
    <header className={clsx(styles.root, className)} style={style}>
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
