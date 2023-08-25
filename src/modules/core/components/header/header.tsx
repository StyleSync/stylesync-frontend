'use client';
import { type FC } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
// components
import { Icon } from '@/modules/core/components/icon';

import type { HeaderProps } from './header.interface';
import styles from './header.module.scss';

export const Header: FC<HeaderProps> = ({
  style,
  className,
  rightAdornment,
}) => {
  return (
    <header className={clsx(styles.root, className)} style={style}>
      <Link href='/'>
        <Icon name='stylesync-logo' width={150} />
      </Link>
      {rightAdornment}
    </header>
  );
};
