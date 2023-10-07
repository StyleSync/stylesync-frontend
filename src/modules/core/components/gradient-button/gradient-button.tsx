import { type FC, useRef } from 'react';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components';

import type { GradientButtonProps } from './gradient-button.interface';
import styles from './gradient-button.module.scss';

export const GradientButton: FC<GradientButtonProps> = ({
  style,
  className,
  gradient,
  rippleColor,
  ...props
}) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <label
      ref={labelRef}
      className={clsx(styles.root, className)}
      style={{ background: gradient, ...style }}
    >
      <Button
        variant='unstyled'
        typographyProps={{
          style: {
            background: gradient,
            WebkitBackgroundClip: 'text',
          },
        }}
        rippleColor={rippleColor}
        {...props}
      />
    </label>
  );
};
