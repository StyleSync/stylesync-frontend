import { type FC } from 'react';
// components
import { Icon, Typography } from '@/modules/core/components';
// constants
import { SERVICE_METADATA } from '@/modules/service/constants/service.constants';

import type { ServiceTagProps } from './service-tag.interface';
import styles from './service-tag.module.scss';

export const ServiceTag: FC<ServiceTagProps> = ({ service }) => {
  const { icon, name } = SERVICE_METADATA[service];

  return (
    <div className={styles.root}>
      <Icon name={icon} width={16} height={16} />
      <Typography variant='small' className={styles.text}>
        {name}
      </Typography>
    </div>
  );
};
