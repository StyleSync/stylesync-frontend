'use client';
import { type FC } from 'react';

// components
import { Typography, Button } from '@/modules/core/components';
import type { ServiceEntityProps } from './service-entity.interface';

import styles from './service-entity.module.scss';

export const ServiceEntity: FC<ServiceEntityProps> = ({
  serviceName,
  serviceTime,
  servicePrice,
}) => {
  return (
    <div className={styles.serviceBox}>
      <div className={styles.serviceContent}>
        <div className={styles.serviceInfo}>
          <Typography className={styles.serviceName} variant='body1'>
            {serviceName}
          </Typography>
          <Typography className={styles.serviceTime} variant='small'>
            {serviceTime}
          </Typography>
        </div>
        <div className={styles.servicePriceBtn}>
          <Typography
            className={styles.servicePrice}
            variant='body1'
            weight='medium'
          >
            {servicePrice}
          </Typography>
          <Button variant='secondary' text='Book' />
        </div>
      </div>
    </div>
  );
};
