import type { FC } from 'react';

import type { LinkProps } from './link.interface';
import styles from './link.module.scss';

export const Link: FC<LinkProps> = ({ href, children }) => {
  return (
    <a href={href} className={styles.link}>
      {children}
    </a>
  );
};
