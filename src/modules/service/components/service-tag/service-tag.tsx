import { type FC } from 'react';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';
// constants
import { SERVICE_METADATA } from '@/modules/service/constants/service.constants';

import type { ServiceTagProps } from './service-tag.interface';
import styles from './service-tag.module.scss';
import clsx from 'clsx';

export const ServiceTag: FC<ServiceTagProps> = ({
  service,
  className,
  style,
}) => {
  const { icon, name } = SERVICE_METADATA[service];

  return (
    <div className={clsx(styles.root, className)} style={style}>
      <Icon name={icon} width={16} height={16} />
      <Typography variant='small' className={styles.text}>
        {name}
      </Typography>
    </div>
  );
};
