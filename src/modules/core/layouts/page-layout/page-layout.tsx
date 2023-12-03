'use client';
import type { FC } from 'react';
import clsx from 'clsx';
// components
import { Header } from '@/modules/core/components/header';
import { Icon } from '@/modules/core/components/icon';

import type { PageLayoutProps } from './page-layout.interface';
import styles from './page-layout.module.scss';

export const PageLayout: FC<PageLayoutProps> = ({
  sidebar,
  children,
  className,
  style,
}) => {
  return (
    <div className={clsx(styles.root, className)} style={style}>
      {sidebar && <div className={styles.sidebar}>{sidebar}</div>}
      <div className={styles.content}>{children}</div>
      {sidebar && (
        <Header.BottomContent>
          <Icon className={styles.headerCorner} name='corner' />
        </Header.BottomContent>
      )}
    </div>
  );
};
