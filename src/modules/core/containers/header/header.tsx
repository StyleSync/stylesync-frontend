import { type FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
// components
import { Icon } from '@/modules/core/components/icon';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
// types
import type { StylingProps } from '@/styles/styles.types';

import styles from './header.module.scss';

export const Header: FC<StylingProps> = ({ style, className }) => {
  return (
    <header className={clsx(styles.root, className)} style={style}>
      <Link href='/'>
        <Icon name='stylesync-logo' width={150} />
      </Link>
      <div className={styles.right}>
        <Typography className={styles.text}>
          Already have an account?
        </Typography>
        <Button text='Log in' variant='secondary' />
      </div>
    </header>
  );
};
