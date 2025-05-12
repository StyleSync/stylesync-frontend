'use client';
import clsx from 'clsx';
import type { FC } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';

import { Icon } from '@/modules/core/components/icon';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { InviteBoxProps } from './invite-box.interface';

import styles from './invite-box.module.scss';

export const InviteBox: FC<InviteBoxProps> = ({
  copyText,
  title,
  subTitle,
  bg = 'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
  slotAfterCopyBox,
}) => {
  const [value, copy] = useCopyToClipboard();

  return (
    <div className={clsx(styles.root)} style={{ background: bg }}>
      <Typography variant='subtitle' className={styles.title} weight='bold'>
        {title}
      </Typography>
      <Typography
        variant='body2'
        className={styles.description}
        weight='semibold'
      >
        {subTitle}
      </Typography>
      <div className={styles.clipboardBox}>
        <Typography>{copyText}</Typography>
        <Icon
          className={clsx(styles.boxCopyIcon, {
            [styles.copied]: value,
          })}
          width={20}
          height={20}
          name='copy'
          onClick={() => {
            copy(copyText);
          }}
        />
      </div>
      {slotAfterCopyBox}
    </div>
  );
};
