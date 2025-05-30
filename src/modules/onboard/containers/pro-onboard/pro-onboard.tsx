'use client';
import { type FC } from 'react';

import clsx from 'clsx';

import { useOnboard } from '@/modules/onboard/hooks/use-onboard';

import styles from './pro-onboard.module.scss';

export const ProOnboard: FC = () => {
  const { Step, next, back } = useOnboard();

  return (
    <div className={styles.root}>
      <div className={clsx(styles.content, 'pageContent')}>
        <Step next={next} back={back} />
      </div>
    </div>
  );
};
