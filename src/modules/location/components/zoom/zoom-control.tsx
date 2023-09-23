import type { FC } from 'react';
import clsx from 'clsx';

import { Icon } from '@/modules/core/components';
import type { ZoomProps } from './zoom-control.interface';

import styles from './zoom-control.module.scss';

export const ZoomControl: FC<ZoomProps> = ({
  onZoomIn,
  onZoomOut,
  className,
}) => {
  return (
    <div className={clsx(styles.zoomControl, className)}>
      <button onClick={onZoomIn} className={styles.zoomControlIn}>
        <Icon name='plus' />
      </button>
      <span>&nbsp;</span>
      <button onClick={onZoomOut} className={styles.zoomControlOn}>
        <Icon name='minus' />
      </button>
    </div>
  );
};