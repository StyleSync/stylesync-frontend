import { type FC } from 'react';
// styles
import scssVariables from '@/styles/variables.module.scss';

import type { SpinnerProps, SpinnerSize } from './spinner.interface';
import styles from './spinner.module.scss';

const sizeParams: Record<
  SpinnerSize,
  {
    width: string;
    height: string;
  }
> = {
  small: {
    width: '18px',
    height: '18px',
  },
};

export const Spinner: FC<SpinnerProps> = ({
  size = 'small',
  color = scssVariables.primaryColor,
}) => {
  return (
    <svg
      className={styles.root}
      viewBox='0 0 66 66'
      xmlns='http://www.w3.org/2000/svg'
      stroke={color}
      {...sizeParams[size]}
    >
      <circle
        className={styles.circle}
        fill='none'
        strokeWidth='6'
        strokeLinecap='round'
        cx='33'
        cy='33'
        r='30'
      />
    </svg>
  );
};
