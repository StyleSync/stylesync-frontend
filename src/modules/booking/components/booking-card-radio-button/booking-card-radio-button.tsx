import { type FC } from 'react';
import { useIntl } from 'react-intl';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { RadioButton } from '@/modules/core/components/radio-button';
// utils
import { formatDuration } from '@/modules/core/utils/time.utils';
// type
import type { BaseCardWithRadioButtonProps } from './booking-card-radio-button.interface';
import styles from './booking-card-radio-button.module.scss';

export const BaseCardWithRadioButton: FC<BaseCardWithRadioButtonProps> = ({
  value,
  serviceOnProfessional,
  onClick,
}) => {
  const intl = useIntl();

  return (
    <div
      className={styles.cardContainer}
      onClick={() => onClick && onClick(value)}
    >
      <div className={styles.cardWrapper}>
        <RadioButton value={value} />
        <div className={styles.descr}>
          <Typography>{serviceOnProfessional.title}</Typography>
          <Typography className={styles.time} variant='small'>
            {formatDuration(serviceOnProfessional.duration, intl)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
