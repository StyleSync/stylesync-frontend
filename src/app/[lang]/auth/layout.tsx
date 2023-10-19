// containers
import { Header } from '@/modules/core/components/header';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

import styles from './layout.module.scss';
import { AuthHeaderRightAdornment } from '@/modules/auth/components/auth-header-right-adornment/auth-header-right-adornment';

export default function AuthLayout({ children }: ChildrenProp) {
  return (
    <div className={styles.root}>
      <Header
        className={styles.header}
        rightSlot={<AuthHeaderRightAdornment />}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
