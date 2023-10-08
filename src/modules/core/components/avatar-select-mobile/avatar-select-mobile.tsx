'use client';

import { type FC } from 'react';
import clsx from 'clsx';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Emoji } from '@/modules/core/components/emoji';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { AvatarSelectMobileProps } from './avatar-select-mobile.interface';
import styles from './avatar-select-mobile.module.scss';

export const AvatarSelectMobile: FC<AvatarSelectMobileProps> = ({
  style,
  className,
  value,
  ...props
}) => {
  return (
    <label className={clsx(styles.root, className)} style={style}>
      <Avatar
        size='medium'
        fallback={<Emoji name='sunglasses' width={32} height={32} />}
        url={value}
        shadow
      />
      <Typography>Select avatar</Typography>
      <input
        type='file'
        className='visibilityHidden'
        multiple={false}
        {...props}
      />
    </label>
  );
};
