'use client';
import { type FC } from 'react';

// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceTag } from '@/modules/service/components/service-tag';

import type { ServicesTableProps } from './service-table.interface';
import styles from './service-table.module.scss';
import clsx from 'clsx';
import { formatMinutesDuration } from '@/modules/core/utils/time.utils';

export const ServicesTable: FC<ServicesTableProps> = ({
  service,
  serviceOnProfessionalList,
}) => {
  return (
    <div className={styles.root}>
      <ServiceTag data={service} />
      <div className={styles.content}>
        {serviceOnProfessionalList.map((serviceOnProfessional) => (
          <div key={serviceOnProfessional.id} className={styles.row}>
            <div className={clsx(styles.cell, styles.vertical, styles.flex75)}>
              <Typography className={styles.title} variant='body1'>
                {serviceOnProfessional.title}
              </Typography>
              <Typography className={styles.duration} variant='small'>
                {formatMinutesDuration(serviceOnProfessional.duration)}
              </Typography>
            </div>
            <div className={clsx(styles.cell, styles.flex25)}>
              <Typography className={styles.price} variant='body1'>
                {serviceOnProfessional.price} {serviceOnProfessional.currency}
              </Typography>
            </div>
            <div className={clsx(styles.cell, styles.fit)}>
              <Button variant='outlined' text='Book' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
