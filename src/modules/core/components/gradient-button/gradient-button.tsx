import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components';

import type { GradientButtonProps } from './gradient-button.interface';
import styles from './gradient-button.module.scss';

export const GradientButton: FC<GradientButtonProps> = ({
  style,
  className,
  gradient,
  ...props
}) => {
  return (
    <label
      className={clsx(styles.root, className)}
      style={{ background: gradient, ...style }}
    >
      <Button
        variant='unstyled'
        typographyProps={{
          style: {
            background: gradient,
            // @ts-ignore
            '-webkit-background-clip': 'text',
          },
        }}
        {...props}
      />
    </label>
  );
};
