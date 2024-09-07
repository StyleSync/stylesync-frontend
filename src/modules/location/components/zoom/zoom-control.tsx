import { type FC } from 'react';
import clsx from 'clsx';

import { Icon } from '@/modules/core/components/icon';
import type { ZoomProps } from './zoom-control.interface';

import styles from './zoom-control.module.scss';

export const ZoomControl: FC<ZoomProps> = ({
  onZoomIn,
  onZoomOut,
  className,
}) => {
  return (
    <div className={clsx(styles.zoomControl, className)}>
      <button aria-label='Zoom plus' onClick={onZoomIn} className={styles.btn}>
        <Icon name='plus' />
      </button>
      <button
        aria-label='Zoom minus'
        onClick={onZoomOut}
        className={styles.btn}
      >
        <Icon name='minus' />
      </button>
    </div>
  );
};
