import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { TagProps } from './tag.interface';
import styles from './tag.module.scss';

export const Tag: FC<TagProps> = ({
  icon,
  iconEnd,
  text,
  className,
  style,
}) => {
  return (
    <div className={clsx(styles.root, className)} style={style}>
      {!!icon && <Icon name={icon} width={16} height={16} />}
      <Typography variant='small' className={styles.text}>
        {text}
      </Typography>
      {!!iconEnd && <Icon name={iconEnd} width={16} height={16} />}
    </div>
  );
};
