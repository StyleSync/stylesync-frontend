'use client';

// components
import { Typography } from '@/modules/core/components';
import { ServiceTag, ServiceEntity } from '@/modules/service/components';

import styles from './user-services.module.scss';

export const Services = () => {
  return (
    <div className={styles.container}>
      <Typography className={styles.title} variant='title'>
        Services
      </Typography>
      <div className={styles.service}>
        <ServiceTag service='hair' />
        <ServiceEntity
          serviceName='Haircut for children'
          serviceTime='40min'
          servicePrice='25 $'
        />
        <ServiceEntity
          serviceName='Haircut for adults'
          serviceTime='1h'
          servicePrice='25 $'
        />
        <ServiceEntity
          serviceName='Haircut for adults + beard trimming'
          serviceTime='1h 30min'
          servicePrice='25 $'
        />
      </div>
      <div className={styles.service}>
        <ServiceTag service='makeup' />
        <ServiceEntity
          serviceName='Wedding makeup'
          serviceTime='1h 30min'
          servicePrice='25 $'
        />
        <ServiceEntity
          serviceName='Evening makeup'
          serviceTime='1h'
          servicePrice='25 $'
        />
        <ServiceEntity
          serviceName='Makeup masterclass'
          serviceTime='2h'
          servicePrice='25 $'
        />
        <ServiceEntity
          serviceName='Base makeup'
          serviceTime='30min'
          servicePrice='25 $'
        />
      </div>
    </div>
  );
};
