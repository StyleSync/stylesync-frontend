import { type FC } from 'react';

import clsx from 'clsx';

import { Emoji } from '@/modules/core/components/emoji';
import { RadioButton } from '@/modules/core/components/radio-button';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { AccountTypeCardProps } from './account-type-card.interface';

import styles from './account-type-card.module.scss';

export const AccountTypeCard: FC<AccountTypeCardProps> = ({
  value,
  title,
  emoji,
  description,
  onClick,
  badge,
  disabled = false,
}) => {
  return (
    <div
      className={clsx(styles.root, { [styles.root_disabled]: disabled })}
      onClick={onClick}
    >
      <div className={styles.title}>
        <RadioButton value={value} disabled={disabled} />
        <Typography variant='body1' weight='medium'>
          {title}
        </Typography>
        <Emoji name={emoji} width={34} height={34} />
      </div>
      <Typography className={styles.description}>{description}</Typography>
      {badge && (
        <div className={styles.badge}>
          <Typography variant='small' className={styles.text}>
            {badge}
          </Typography>
        </div>
      )}
    </div>
  );
};
