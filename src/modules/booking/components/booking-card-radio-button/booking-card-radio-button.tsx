import { type FC } from 'react';
import { Typography } from '@/modules/core/components/typogrpahy';
import { RadioButton } from '@/modules/core/components/radio-button';
import { formatDuration } from '@/modules/core/utils/time.utils';

// type
import { type ServiceOnProfessional } from '@/modules/service/types/service.types';

import styles from './booking-card-radio-button.module.scss';

export const BaseCardWithRadioButton: FC<{
  value: string;
  serviceOnProfessional: ServiceOnProfessional;
  onClick?: (name: string) => void;
}> = ({ value, serviceOnProfessional, onClick }) => {
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
            {formatDuration(serviceOnProfessional.duration)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
