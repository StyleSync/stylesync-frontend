import { type FC, useMemo } from 'react';
import clsx from 'clsx';

import Image from 'next/image';

import type { AvatarProps } from './avatar.interface';
import styles from './avatar.module.scss';

export const Avatar: FC<AvatarProps> = ({
  url,
  size = 'small',
  fallback = <UserIcon />,
  shadow = false,
  shape = 'circle',
}) => {
  const avatarSize = useMemo(() => {
    if (size === 'medium') {
      return 56;
    } else if (size === 'large') {
      return 156;
    } else {
      return 40;
    }
  }, [size]);

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
        <div className={styles.fallbackContainer}>{fallback}</div>
      )}
    </div>
  );
};

const UserIcon: React.FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    className={styles.userIcon}
  >
    <path
      d='M5 20V19C5 15.134 8.13401 12 12 12C15.866 12 19 15.134 19 19V20'
      stroke='white'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z'
      stroke='white'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
