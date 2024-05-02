import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Illustration } from '@/modules/core/components/illustration';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { PlaceholderProps } from './placeholder.interface';
import styles from './placeholder.module.scss';

const renderPlaceholder = (placeholder: PlaceholderProps['placeholder']) => {
  if (
    placeholder &&
    typeof placeholder === 'object' &&
    'illustration' in placeholder
  ) {
    return (
      <div className={styles.illustrationPlaceholder}>
        <Illustration name={placeholder.illustration} width={220} />
        {placeholder.description && (
          <Typography className={styles.description}>
            {placeholder.description}
          </Typography>
        )}
        {placeholder.action}
      </div>
    );
  }

  return <>{placeholder}</>;
};

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
      {renderPlaceholder(placeholder)}
    </div>
  );
};
