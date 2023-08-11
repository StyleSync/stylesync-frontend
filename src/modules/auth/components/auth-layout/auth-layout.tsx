import type { FC } from 'react';
// containers
import { Header } from '@/modules/core/containers/header';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

import styles from './auth-layout.module.scss';

export const AuthLayout: FC<ChildrenProp> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      {children}
    </div>
  );
};
