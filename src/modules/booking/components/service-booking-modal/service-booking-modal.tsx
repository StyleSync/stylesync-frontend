import { type FC, useState } from 'react';
// components
import { RadioButton } from '@/modules/core/components/radio-button';
import { Avatar } from '@/modules/core/components/avatar';

import { Stepper } from '@/modules/core/components/stepper';
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';

// type
import { type ModalProps } from '@/modules/core/components/dialog/dialog.interface';
// style
import styles from './service-booking-modal.module.scss';
import { Button } from '@/modules/core/components/button';
import { trpc } from '@/modules/core/utils/trpc.utils';

import { type ServiceOnProfessional } from '@/modules/service/types/service.types';

const BaseCardWithRadioButton: FC<{
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
            1h 30min
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const ServiceBookingModal: FC<Omit<ModalProps, 'children'>> = (
  props
) => {
  // state
  const [value, setValue] = useState<string | null>(null);

  const { data: serviceList } = trpc.serviceOnProfessional.list.useQuery({
    limit: 10,
    offset: 0,
  });

  return (
    <Dialog {...props}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography variant='subtitle'>New booking</Typography>
          <Button
            onClick={() => props.onOpenChange && props.onOpenChange(false)}
            variant='unstyled'
            icon='close'
          />
        </div>
        <div className={styles.labelContainer}>
          <Avatar />

          <div className={styles.lableDescr}>
            <Typography variant='body1'>Tennisha’s Beauty</Typography>
            <Typography className={styles.lableAddress} variant='small'>
              Greyhound Dr, Bradford BD7 1NQ
            </Typography>
          </div>
        </div>
        <div className={styles.stepper}>
          <Stepper
            steps={[
              {
                text: 'Service',
                value: 'service',
              },
              {
                text: 'Date & Time',
                value: 'datetime',
              },
              {
                text: 'Confirmation',
                value: 'confirmation',
              },
            ]}
            value='service'
          />
        </div>
        <div>
          <RadioButton.Group value={value} onChange={setValue} name='cards'>
            <div className={styles.baseCardContainer}>
              {serviceList?.map((service) => (
                <BaseCardWithRadioButton
                  key={service.id}
                  value='card1'
                  serviceOnProfessional={service}
                />
              ))}
            </div>
          </RadioButton.Group>
        </div>
        <Button text='Next' variant='outlined' />
      </div>
    </Dialog>
  );
};
