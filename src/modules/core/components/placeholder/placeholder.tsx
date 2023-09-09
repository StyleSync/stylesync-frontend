import { type FC } from 'react';

import type { PlaceholderProps } from './placeholder.interface';
import styles from './placeholder.module.scss';
import clsx from 'clsx';

export const Placeholder: FC<PlaceholderProps> = ({
  isActive,
  placeholder,
  children,
  className,
  style,
  fadeIn,
}) => {
  if (!isActive) {
    return <>{children}</>;
  }

  return (
    <div
      className={clsx(styles.root, className, {
        [styles.fadeIn]: fadeIn,
      })}
      style={style}
    >
      {placeholder}
    </div>
  );
};
