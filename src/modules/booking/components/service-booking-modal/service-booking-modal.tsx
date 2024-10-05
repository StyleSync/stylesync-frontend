import { type FC, useState, useEffect, useCallback, useId } from 'react';
import { useIntl } from 'react-intl';

// components
import { Avatar } from '@/modules/core/components/avatar';
import { Typography } from '@/modules/core/components/typogrpahy';
import { BookingForm } from '@/modules/booking/components/booking-form';
import { BookingTimeSelect } from '@/modules/booking/containers/booking-time-select';
import { ServiceOnProfessionalSelect } from '@/modules/service/components/service-on-professional-select';
import { DialogWizard } from '@/modules/core/components/dialog-wizard';
// utils
import { onQueryRetry } from '@/modules/core/utils/query-retry.utils';
// type
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
import { type AvailableBookingTime } from '@/server/types';
import { type BookingFormValue } from '@/modules/booking/components/booking-form/booking-form';
import { type ServiceBookingModalProps } from './service-booking-modal.interface';
// assets
import Bg from '@/assets/images/bg-1.png';
import Image from 'next/image';
import { getFullName } from '@/modules/user/utils/user.utils';
import type { ServiceOnProfessionalListItem } from '@/modules/service/types/service.types';
import { Icon, type IconName } from '@/modules/core/components/icon';
import { formatI18n } from '@/modules/internationalization/utils/data-fns-internationalization';
import { startOfToday } from 'date-fns';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Button } from '@/modules/core/components/button';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';

export const ServiceBookingModal: FC<
  Omit<DialogProps, 'children'> & ServiceBookingModalProps
> = ({ onConfirm, isLoading, professional, ...props }) => {
  const intl = useIntl();
  const confirmationFormId = useId();
  const deviceType = useDeviceType();

  // state
  const [serviceOnProfessional, setServiceOnProfessional] =
    useState<ServiceOnProfessionalListItem | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(
    startOfToday().toISOString()
  );
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<null | AvailableBookingTime>(null);
  const [step, setStep] = useState<'service' | 'datetime' | 'confirmation'>(
    'service'
  );

  useEffect(() => {
    if (props.selectedService && props.isOpen) {
      setServiceOnProfessional(props.selectedService);
    }
  }, [props.selectedService, props.isOpen]);

  useEffect(() => {
    if (!props.isOpen) {
      setServiceOnProfessional(null);
      setSelectedDay(startOfToday().toISOString());
      setSelectedTimeRange(null);
      setStep('service');
    }
  }, [props.isOpen]);

  const { data: location } = trpc.location.getByProfessionalId.useQuery(
    {
      id: professional.id || '',
    },
    {
      retry: (retryCount, error) => onQueryRetry(retryCount, error),
      enabled: !!professional.id,
    }
  );

  const handleNext = useCallback(() => {
    setStep((prevState) => {
      if (prevState === 'service') {
        return 'datetime';
      }

      if (prevState === 'datetime') {
        return 'confirmation';
      }

      return prevState;
    });
  }, []);

  const handleBack = useCallback(() => {
    setStep((prevState) => {
      if (prevState === 'confirmation') {
        return 'datetime';
      }

      if (prevState === 'datetime') {
        return 'service';
      }

      return prevState;
    });
  }, []);

  const handleModalClose = () => {
    if (props.onOpenChange) {
      props.onOpenChange(false);
    }
  };

  const handleConfirm = (data: BookingFormValue) => {
    if (serviceOnProfessional && selectedDay && selectedTimeRange) {
      onConfirm({
        ...data,
        selectedDay,
        selectedTimeRange,
        serviceOnProfessional: serviceOnProfessional.id,
      });
    }
  };

  return (
    <DialogWizard
      activeStepId={step}
      steps={[
        {
          id: 'service',
          title: 'Choose a service',
          isNext: true,
          nextBtnProps: {
            disabled: !serviceOnProfessional,
          },
        },
        {
          id: 'datetime',
          title: 'Select time',
          isNext: true,
          isBack: true,
          nextBtnProps: {
            disabled: !selectedDay || !selectedTimeRange,
          },
        },
        {
          id: 'confirmation',
          title: 'Confirm booking',
          isNext: true,
          isBack: true,
          nextBtnProps: {
            text: 'Book',
            form: confirmationFormId,
            type: 'submit',
          },
        },
      ]}
      onNext={handleNext}
      onBack={handleBack}
      handleModalClose={handleModalClose}
      isNextLoading={isLoading}
      {...props}
      classes={{ content: '!h-dvh !overflow-hidden w-full' }}
    >
      <div className='relative flex w-full flex-1 flex-col overflow-hidden sm:w-[620px]'>
        <Image
          className='absolute left-0 top-0 h-[120px] w-full opacity-20'
          src={Bg.src}
          width={Bg.width}
          height={Bg.height}
          blurDataURL={Bg.blurDataURL}
          alt='booking bg'
        />
        <div className='z-10 flex items-center justify-between gap-x-3 px-6 pt-6'>
          <div className='flex w-fit items-center gap-x-3'>
            <Avatar url={professional.user?.avatar} shadow size={40} />
            <div className='flex flex-col'>
              <span className='text-base font-medium text-dark'>
                {getFullName(professional.user || {})}
              </span>
              <span className='text-xs font-medium text-gray-accent'>
                {location?.name}
              </span>
            </div>
          </div>
          {step !== 'service' && (
            <div className='flex shrink-0 flex-col items-end gap-y-1'>
              {serviceOnProfessional && (
                <span className='text-sm font-medium !text-dark'>
                  <Icon
                    name={serviceOnProfessional.service.icon as IconName}
                    width={17}
                    height={17}
                    className='mr-2 inline'
                  />
                  {serviceOnProfessional.title}
                </span>
              )}
              {step === 'confirmation' && selectedDay && (
                <Typography
                  variant='small'
                  weight='bold'
                  className='!text-gray'
                >
                  {formatI18n(
                    new Date(selectedDay),
                    'dd MMM yyyy',
                    intl.locale
                  )}
                </Typography>
              )}
            </div>
          )}
        </div>
        <div className='relative z-10 flex-1 overflow-scroll bg-white px-6 pt-6 shadow'>
          {step === 'service' && (
            <ServiceOnProfessionalSelect
              professional={professional}
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
              serviceOnProfessionalId={serviceOnProfessional?.id}
            />
          )}
          {step === 'confirmation' && (
            <div className='flex flex-col gap-y-4'>
              {deviceType === 'mobile' && (
                <div className='flex flex-col gap-y-1'>
                  {serviceOnProfessional && (
                    <span className='text-sm font-medium !text-dark'>
                      {serviceOnProfessional.title}
                    </span>
                  )}
                  {step === 'confirmation' && selectedDay && (
                    <Typography
                      variant='small'
                      weight='medium'
                      className='!text-gray'
                    >
                      {formatI18n(
                        new Date(selectedDay),
                        'dd MMM yyyy',
                        intl.locale
                      )}
                    </Typography>
                  )}
                </div>
              )}
              <BookingForm
                onSubmit={handleConfirm}
                formId={confirmationFormId}
              />
            </div>
          )}
        </div>
        {deviceType === 'mobile' && (
          <div className='z-10 flex w-full bg-white px-6 pb-6 pt-5 shadow'>
            {step === 'confirmation' ? (
              <Button
                className='!w-full'
                type='submit'
                form={confirmationFormId}
                text='Reserve'
                disabled={isLoading}
                isLoading={isLoading}
              />
            ) : (
              <Button
                className='!w-full'
                onClick={handleNext}
                text='Next'
                disabled={
                  (step === 'service' && !serviceOnProfessional) ||
                  (step === 'datetime' && (!selectedDay || !selectedTimeRange))
                }
                isLoading={isLoading}
              />
            )}
          </div>
        )}
      </div>
    </DialogWizard>
  );
};
