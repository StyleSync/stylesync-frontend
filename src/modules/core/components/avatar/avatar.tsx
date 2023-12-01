import { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
// components
import { Icon } from '@/modules/core/components/icon';

import type { AvatarProps, AvatarSize } from './avatar.interface';
import styles from './avatar.module.scss';

const SIZES: Record<AvatarSize, number> = {
  small: 40,
  medium: 80,
  large: 156,
};

export const Avatar: FC<AvatarProps> = ({
  url,
  size = 'small',
  fallback = <Icon name='user' className={styles.userIcon} />,
  shadow = false,
  shape = 'circle',
  style,
  className,
}) => {
  const _size = typeof size === 'number' ? size : SIZES[size];

  return (
    <div
      className={clsx(
        styles.avatarContainer,
        styles[shape],
        {
          [styles.shadow]: shadow,
        },
        className
      )}
      style={{
        width: `${_size}px`,
        height: `${_size}px`,
        ...style,
      }}
    >
      {url && (
        <Image
          src={url}
          alt='Avatar'
          width={_size}
          height={_size}
          style={{
            objectFit: 'cover',
          }}
        />
      )}
      {!url && fallback && (
        <div className={styles.fallbackContainer}>{fallback}</div>
      )}
    </div>
  );
};
