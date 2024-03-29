import { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
// components
import { Icon } from '@/modules/core/components/icon';

import type { AvatarProps, AvatarSize } from './avatar.interface';
import styles from './avatar.module.scss';
import { useBoolean } from 'usehooks-ts';

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
  // state
  const isAvatarLoading = useBoolean(!!url);

  return (
    <div
      className={clsx(
        styles.avatarContainer,
        styles[shape],
        {
          [styles.shadow]: shadow,
          [styles.loading]: isAvatarLoading.value,
        },
        className
      )}
      style={{
        width: `${_size}px`,
        height: `${_size}px`,
        ...style,
      }}
    >
      <div
        className={clsx(styles.skeleton, 'skeleton', {
          [styles.active]: isAvatarLoading.value,
        })}
      />
      {url && (
        <Image
          src={url}
          alt='Avatar'
          width={_size}
          height={_size}
          className={clsx(styles.image)}
          onLoadStart={isAvatarLoading.setTrue}
          onLoadingComplete={isAvatarLoading.setFalse}
        />
      )}
      {!url && fallback && (
        <div className={styles.fallbackContainer}>{fallback}</div>
      )}
    </div>
  );
};
