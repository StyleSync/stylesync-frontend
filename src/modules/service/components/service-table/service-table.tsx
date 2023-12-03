'use client';
import { type FC } from 'react';
// components
import { ServiceTag } from '@/modules/service/components/service-tag';
import { ServiceOnProfessionalTableRow } from '@/modules/service/components/service-on-professional-table-row';

import type { ServicesTableProps } from './service-table.interface';
import styles from './service-table.module.scss';

export const ServicesTable: FC<ServicesTableProps> = ({
  service,
  serviceOnProfessionalList,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <ServiceTag data={service} />
      </div>
      <div className={styles.content}>
        {serviceOnProfessionalList.map((serviceOnProfessional) => (
          <ServiceOnProfessionalTableRow
            key={serviceOnProfessional.id}
            data={serviceOnProfessional}
          />
        ))}
      </div>
    </div>
  );
};
