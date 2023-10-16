'use client';
import type { FC } from 'react';
import clsx from 'clsx';
// library
import { useCopyToClipboard } from 'usehooks-ts';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Icon } from '@/modules/core/components/icon';

import type { InviteBoxProps } from './invite-box.interface';
import styles from './invite-box.module.scss';

export const InviteBox: FC<InviteBoxProps> = ({
  copyText,
  variant,
  titleColor,
  icon,
  title,
  subTitle,
}) => {
  const [value, copy] = useCopyToClipboard();

  return (
    <div
      className={clsx(styles.boxContainer, {
        [styles.link]: variant === 'link',
        [styles.invite]: variant === 'invite',
      })}
    >
      <Typography
        variant='subtitle'
        className={clsx({
          [styles.yellow]: titleColor === 'yellow',
          [styles.blue]: titleColor === 'blue',
        })}
      >
        {title}
      </Typography>

      <Typography variant='small' className={styles.boxSubTitle}>
        {subTitle}
      </Typography>

      <div className={styles.boxClipboard}>
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

      {icon && (
        <div className={styles.socialMedia}>
          {icon.map((iconName, index) => (
            <Icon
              key={index}
              className={styles.socialIcon}
              width={34}
              height={34}
              name={iconName}
            />
          ))}
        </div>
      )}
    </div>
  );
};
