import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// styles
import serviceTableStyles from '@/modules/service/components/service-table/service-table.module.scss';

import type { ServiceTableSkeletonProps } from './service-table-skeleton.interface';
import styles from './service-table-skeleton.module.scss';

export const ServiceTableSkeleton: FC<ServiceTableSkeletonProps> = ({
  rows = 2,
}) => {
  const deviceType = useDeviceType();

  return (
    <div className={clsx(styles.root, serviceTableStyles.root)}>
      <div className={clsx('skeleton', styles.tag)} />
      <div className={clsx(styles.content, serviceTableStyles.content)}>
        {[...new Array(rows)].map((item, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.info}>
              <div className={clsx('skeleton', styles.title)} />
              <div className={clsx('skeleton', styles.duration)} />
            </div>
            <div
              className={clsx(
                serviceTableStyles.cell,
                serviceTableStyles.flex25
              )}
            >
              <div className={clsx('skeleton', styles.price)} />
            </div>
            <div
              className={clsx(serviceTableStyles.cell, serviceTableStyles.fit)}
            >
              {deviceType === 'mobile' ? (
                <Icon
                  className={styles.chevron}
                  width={18}
                  height={18}
                  name='chevron-right'
                />
              ) : (
                <Button variant='outlined' text='Book' disabled />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
