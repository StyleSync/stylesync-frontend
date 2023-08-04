import { FC } from 'react';
import styles from './zoom.module.scss';
import { Icon } from '@/modules/core/components';
import { ZoomProps } from './zoom.interface';
import clsx from 'clsx';

export const Zoom: FC<ZoomProps> = ({
  onZoomIn,
  onZoomOut,
  className,
  style,
}) => {
  return (
    <div className={clsx(styles.zoom_control, className)}>
      <button onClick={onZoomIn} className={styles.zoom_control_in}>
        <Icon name='plus' />
      </button>
      <span></span>
      <button onClick={onZoomOut} className={styles.zoom_control_on}>
        <Icon name='minus' />
      </button>
    </div>
  );
};
