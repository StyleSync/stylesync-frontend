import { type FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
// components
import { Icon } from '@/modules/core/components';

import type { AvatarProps, AvatarSize } from './avatar.interface';
import styles from './avatar.module.scss';

const SIZES: Record<AvatarSize, number> = {
  small: 40,
  medium: 56,
  large: 156,
};

export const Avatar: FC<AvatarProps> = ({
  url,
  size = 'small',
  fallback = <Icon name='user' className={styles.userIcon} />,
  shadow = false,
  shape = 'circle',
}) => {
  const avatarSize = SIZES[size];

  return (
    <div
      className={clsx(styles.avatarContainer, styles[shape], {
        [styles.shadow]: shadow,
      })}
      style={{
        width: `${avatarSize}px`,
        height: `${avatarSize}px`,
      }}
    >
      {url ? (
        <Image
          src={url}
          alt='Avatar'
          width={avatarSize}
          height={avatarSize}
          style={{
            objectFit: 'cover',
          }}
        />
      ) : (
        !url &&
        fallback && <div className={styles.fallbackContainer}>{fallback}</div>
      )}
    </div>
  );
};
