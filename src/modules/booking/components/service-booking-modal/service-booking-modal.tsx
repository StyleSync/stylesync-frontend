import { type FC, useState, useEffect } from 'react';
// components
import { Avatar } from '@/modules/core/components/avatar';
import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { Stepper } from '@/modules/core/components/stepper';
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingForm } from '@/modules/booking/components/booking-form';
import { BookingTimeSelect } from '@/modules/booking/containers/booking-time-select';
import { ServiceOnProfessionalSelect } from '@/modules/service/components/service-on-professional-select';
// type
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
import { type AvailableBookingTime } from '@/server/types';
import { type BookingFormValue } from '../booking-form/booking-form.interface';
import { type ServiceBookingModalProps } from './service-booking-modal.interface';
// style
import styles from './service-booking-modal.module.scss';

export const ServiceBookingModal: FC<
  Omit<DialogProps, 'children'> & ServiceBookingModalProps
> = ({ onConfirm, isLoading, ...props }) => {
  // ServiceOnProfessionalSelect
  const [serviceOnProfessional, setServiceOnProfessional] =
    useState<string>('');
  // BookingTimeSelect
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<null | AvailableBookingTime>(null);
  // steps
  const [step, setStep] = useState<'service' | 'datetime' | 'confirmation'>(
    'service'
  );

  useEffect(() => {
    if (props.isOpen === false) {
      setServiceOnProfessional('');
      setSelectedDay(null);
      setSelectedTimeRange(null);
      setStep('service');
    }
  }, [props.isOpen]);

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

      setSelectedDay(null);
      setSelectedTimeRange(null);
    } else if (step === 'datetime') {
      setStep('service');

      setSelectedDay(null);
      setSelectedTimeRange(null);
    }
  };

  const handleConfirm = (data: BookingFormValue) => {
    if (serviceOnProfessional && selectedDay && selectedTimeRange) {
      onConfirm({
        ...data,
        selectedDay,
        selectedTimeRange,
        serviceOnProfessional,
      });

      setServiceOnProfessional('');
      setSelectedDay(null);
      setSelectedTimeRange(null);
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
          {step === 'confirmation' && (
            <BookingForm
              isLoading={isLoading}
              onSubmit={handleConfirm}
              onClickBack={handleBack}
            />
          )}
        </div>

        {step !== 'confirmation' && (
          <div className={styles.navigationBtns}>
            {step === 'service' && (
              <Button
                className={styles.buttonRight}
                onClick={handleNext}
                text='Next'
                variant='outlined'
                iconEnd='arrow-right'
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
                  iconEnd='arrow-right'
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
