'use client';
import { type FC } from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import { useIntl } from 'react-intl';

import type { IconName } from '@/modules/core/components/icon';
import { Tag } from '@/modules/core/components/tag';
import { ServiceOnProfessionalTableRow } from '@/modules/service/components/service-on-professional-table-row';

import type { ServicesTableProps } from './service-table.interface';

import styles from './service-table.module.scss';

export const ServicesTable: FC<ServicesTableProps> = ({
  service,
  serviceOnProfessionalList,
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
        <Accordion.Root type='multiple'>
          {serviceOnProfessionalList.map((serviceOnProfessional) => (
            <ServiceOnProfessionalTableRow
              isOwn={isOwn}
              key={serviceOnProfessional.id}
              data={serviceOnProfessional}
            />
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};
