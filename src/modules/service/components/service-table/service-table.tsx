'use client';
import { type FC } from 'react';
import { useIntl } from 'react-intl';
// components
import { Tag } from '@/modules/core/components/tag';
import { ServiceOnProfessionalTableRow } from '@/modules/service/components/service-on-professional-table-row';
// types
import type { IconName } from '@/modules/core/components/icon';

import type { ServicesTableProps } from './service-table.interface';
import styles from './service-table.module.scss';

export const ServicesTable: FC<ServicesTableProps> = ({
  service,
  serviceOnProfessionalList,
  professional,
  isOwn,
}) => {
  const intl = useIntl();

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <Tag
          icon={service.icon as IconName}
          text={intl.formatMessage({ id: service.name })}
        />
      </div>
      <div className={styles.content}>
        {serviceOnProfessionalList.map((serviceOnProfessional) => (
          <ServiceOnProfessionalTableRow
            isOwn={isOwn}
            professional={professional}
            key={serviceOnProfessional.id}
            data={serviceOnProfessional}
          />
        ))}
      </div>
    </div>
  );
};
