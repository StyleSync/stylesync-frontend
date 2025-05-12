import { type FC, type SVGProps } from 'react';

import scssVariables from '@/styles/variables.module.scss';

import type { SpinnerProps, SpinnerSize } from './spinner.interface';

import styles from './spinner.module.scss';

const getSizeParams = (size: SpinnerSize): SVGProps<SVGSVGElement> => {
  if (typeof size === 'number') {
    return {
      width: `${size}px`,
      height: `${size}px`,
    };
  }

  switch (size) {
    case 'small':
      return { width: '18px', height: '18px' };
    case 'medium':
      return { width: '32px', height: '32px' };
    case 'large':
      return { width: '64px', height: '64px' };
    default:
      throw new Error('Unknown spinner size');
  }
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
      {...getSizeParams(size)}
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
