import { type FC } from 'react';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
// components
import { Icon, type IconName } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { ServiceTagProps } from './service-tag.interface';
import styles from './service-tag.module.scss';

export const ServiceTag: FC<ServiceTagProps> = ({ data, className, style }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={clsx(styles.root, className)} style={style}>
      <Icon name={data.icon as IconName} width={16} height={16} />
      <Typography variant='small' className={styles.text}>
        {formatMessage({ id: data.name })}
      </Typography>
    </div>
  );
};
