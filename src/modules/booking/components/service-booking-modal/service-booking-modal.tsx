import { type FC, useState } from 'react';
// components

import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { Stepper } from '@/modules/core/components/stepper';
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingForm } from '@/modules/booking/components/booking-form';
import { BookingTimeSelect } from '@/modules/booking/containers/booking-time-select';
import { ServiceOnProfessionalSelect } from '@/modules/service/components/service-on-professional-select';

// type
import type { DialogProps } from '@/modules/core/components/dialog/dialog.interface';

import styles from './service-booking-modal.module.scss';

type BookingStep = 'service' | 'confirmation' | 'datetime';

const stepsData: Record<BookingStep, { Step: FC }> = {
  service: { Step: ServiceOnProfessionalSelect },
  confirmation: { Step: BookingForm },
  datetime: { Step: BookingTimeSelect },
};

export const ServiceBookingModal: FC<Omit<DialogProps, 'children'>> = (
  props
) => {
  const [step, setStep] = useState<'service' | 'datetime' | 'confirmation'>(
    'service'
  );

  const { Step } = stepsData[step];

  const handleNext = () => {
    if (step === 'service') {
      setStep('datetime');
    } else if (step === 'datetime') {
      setStep('confirmation');
    }
  };

  const handleBack = () => {
    if (step === 'confirmation') {
      setStep('datetime');
    } else if (step === 'datetime') {
      setStep('service');
    }
  };

  return (
    <Dialog {...props} classes={{ content: styles.content }}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography variant='subtitle'>New booking</Typography>
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
            value={step}
          />
        </div>

        <div className={styles.contentContainer}>
          <Step />
        </div>

        <div className={styles.navigationBtns}>
          {step !== 'service' && (
            <Button
              className={styles.buttonBack}
              onClick={handleBack}
              text='Back'
              icon='arrow-left'
              variant='outlined'
            />
          )}

          <Button
            className={styles.buttonRight}
            onClick={handleNext}
            text={step === 'confirmation' ? 'Confirm' : 'Next'}
            iconEnd={step === 'confirmation' ? undefined : 'arrow-right'}
            variant={step === 'confirmation' ? 'primary' : 'outlined'}
          />
        </div>
      </div>
    </Dialog>
  );
};
