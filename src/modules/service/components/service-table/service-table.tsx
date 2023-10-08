'use client';
import { type FC } from 'react';

// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { ServiceTag } from '@/modules/service/components/service-tag';

import type { ServicesTableProps } from './service-table.interface';
import styles from './service-table.module.scss';

export const ServicesTable: FC<ServicesTableProps> = ({
  service,
  userServices,
}) => {
  return (
    <div className={styles.service}>
      <ServiceTag service={service} />
      {userServices.map((userService) => (
        <div key={userService.id} className={styles.serviceBox}>
          <div className={styles.serviceContent}>
            <div className={styles.serviceInfo}>
              <Typography className={styles.serviceName} variant='body1'>
                {userService.name}
              </Typography>
              <Typography className={styles.serviceTime} variant='small'>
                {userService.duration}
              </Typography>
            </div>
            <div className={styles.servicePriceBtn}>
              <Typography
                className={styles.servicePrice}
                variant='body1'
                weight='medium'
              >
                {userService.price}
              </Typography>
              <Button variant='outlined' text='Book' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
