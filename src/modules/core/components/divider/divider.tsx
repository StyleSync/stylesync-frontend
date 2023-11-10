import React, { type FC } from 'react';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components/typogrpahy';

import type { DividerProps } from './divider.interface';
import styles from './divider.module.scss';

export const Divider: FC<DividerProps> = ({
  variant = 'horizontal',
  children,
  className,
  style,
}) => {
  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.vertical]: variant === 'vertical',
          [styles.horizontal]: variant === 'horizontal',
        },
        className
      )}
      style={style}
    >
      {!(children === null || children === undefined || children === '') && (
        <div className={styles.children}>
          {typeof children === 'string' ? (
            <Typography>{children}</Typography>
          ) : (
            <>{children}</>
          )}
        </div>
      )}
    </div>
  );
};
