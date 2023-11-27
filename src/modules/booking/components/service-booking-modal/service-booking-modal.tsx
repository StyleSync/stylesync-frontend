import { type FC, useState } from 'react';
// components
import { RadioButton } from '@/modules/core/components/radio-button';
import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { Stepper } from '@/modules/core/components/stepper';
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingForm } from '@/modules/booking/components/booking-form';
import { BookingCalendar } from '@/modules/booking/components/booking-calendar';
import { BaseCardWithRadioButton } from '../booking-card-radio-button';
// type
import { type ModalProps } from '@/modules/core/components/dialog/dialog.interface';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';

import styles from './service-booking-modal.module.scss';

export const ServiceBookingModal: FC<Omit<ModalProps, 'children'>> = (
  props
) => {
  // state
  const [value, setValue] = useState<string>('');

  const [step, setStep] = useState<'service' | 'datetime' | 'confirmation'>(
    'service'
  );

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
            value={step}
          />
        </div>

        <div className={styles.contentContainer}>
          {step === 'service' && (
            <RadioButton.Group value={value} onChange={setValue} name='cards'>
              <div className={styles.baseCardContainer}>
                {serviceList?.map((service) => (
                  <BaseCardWithRadioButton
                    key={service.id}
                    value={value}
                    serviceOnProfessional={service}
                    onClick={(currentValue) => setValue(currentValue)}
                  />
                ))}
              </div>
            </RadioButton.Group>
          )}
          {step === 'confirmation' && <BookingForm />}
          {step === 'datetime' && <BookingCalendar />}
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
            // style={{ marginLeft: step === 'service' ? 'auto' : undefined }}
          />
        </div>
      </div>
    </Dialog>
  );
};
