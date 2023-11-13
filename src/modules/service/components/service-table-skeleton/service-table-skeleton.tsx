import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Button } from '@/modules/core/components/button';
// styles
import serviceTableStyles from '@/modules/service/components/service-table/service-table.module.scss';

import type { ServiceTableSkeletonProps } from './service-table-skeleton.interface';
import styles from './service-table-skeleton.module.scss';

export const ServiceTableSkeleton: FC<ServiceTableSkeletonProps> = ({
  rows = 2,
}) => {
  return (
    <div className={clsx(styles.root, serviceTableStyles.root)}>
      <div className={clsx('skeleton', styles.tag)} />
      <div className={clsx(styles.content, serviceTableStyles.content)}>
        {[...new Array(rows)].map((item, index) => (
          <div key={index} className={clsx(styles.row, serviceTableStyles.row)}>
            <div
              className={clsx(
                serviceTableStyles.cell,
                serviceTableStyles.vertical,
                serviceTableStyles.flex75
              )}
            >
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
              <Button variant='outlined' text='Book' disabled />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
