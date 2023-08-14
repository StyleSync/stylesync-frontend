// containers
import { Header } from '@/modules/core/containers/header';
// types
import type { ChildrenProp } from '@/modules/core/types/react.types';

import styles from './layout.module.scss';

export default function Layout({ children }: ChildrenProp) {
  return (
    <div className={styles.root}>
      <Header />
      {children}
    </div>
  );
}
