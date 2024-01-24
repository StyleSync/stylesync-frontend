import { type FC, useState } from 'react';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { Stepper } from '@/modules/core/components/stepper';
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingForm } from '@/modules/booking/components/booking-form';
import { BookingTimeSelect } from '@/modules/booking/containers/booking-time-select';
import { ServiceOnProfessionalSelect } from '@/modules/service/components/service-on-professional-select';
// utils
// import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import type { DialogProps } from '@/modules/core/components/dialog/dialog.interface';
// style
import styles from './service-booking-modal.module.scss';

export const ServiceBookingModal: FC<Omit<DialogProps, 'children'>> = (
  props
) => {
  // state ServiceOnProfessionalSelect
  const [serviceOnProfessional, setServiceOnProfessional] =
    useState<string>('');
  // state BookingTimeSelect
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<number | null>(
    null
  );

  // mutations
  // const bookingCreate = trpc.booking.create.useMutation();

  // steps
  const [step, setStep] = useState<'service' | 'datetime' | 'confirmation'>(
    'service'
  );

  const handleNext = () => {
    if (step === 'service') {
      setStep('datetime');
    } else if (step === 'datetime') {
      setStep('confirmation');
    } else {
      // bookingCreate.mutate({
      //   serviceProfessionalId: serviceOnProfessional,
      // });
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
          {step === 'service' && (
            <ServiceOnProfessionalSelect
              value={serviceOnProfessional}
              onChange={setServiceOnProfessional}
            />
          )}
          {step === 'datetime' && (
            <BookingTimeSelect
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedTimeRange={selectedTimeRange}
              setSelectedTimeRange={setSelectedTimeRange}
              professionalId={serviceOnProfessional}
            />
          )}
          {step === 'confirmation' && <BookingForm onClickBack={handleBack} />}
        </div>

        {step !== 'confirmation' && (
          <div className={styles.navigationBtns}>
            {step === 'service' && (
              <Button
                className={styles.buttonRight}
                onClick={handleNext}
                text='Next'
                variant='outlined'
                icon='arrow-right'
                disabled={!serviceOnProfessional}
              />
            )}

            {step === 'datetime' && (
              <>
                <Button
                  className={styles.buttonBack}
                  onClick={handleBack}
                  text='Back'
                  icon='arrow-left'
                  variant='outlined'
                />
                <Button
                  className={styles.buttonNext}
                  onClick={handleNext}
                  text='Next'
                  variant='outlined'
                  icon='arrow-right'
                  disabled={!selectedTimeRange}
                />
              </>
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
};
