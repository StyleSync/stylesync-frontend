import { type FC } from 'react';

import scssVariables from '@/styles/variables.module.scss';

import type { ProgressProps } from './progress.interface';

import styles from './progress.module.scss';

export const Progress: FC<ProgressProps> = ({ progress, color }) => {
  return (
    <div
      className={styles.root}
      style={{
        backgroundColor: color?.bg ?? scssVariables.primaryLightColor,
      }}
    >
      <div
        className={styles.progress}
        style={{
          backgroundColor: color?.progress ?? scssVariables.primaryColor,
          width: `${progress}%`,
        }}
      />
    </div>
  );
};
