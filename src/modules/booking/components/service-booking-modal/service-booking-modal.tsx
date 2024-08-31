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

export const ServiceBookingModal: FC<
  Omit<DialogProps, 'children'> & ServiceBookingModalProps
> = ({ onConfirm, isLoading, professional, ...props }) => {
  const intl = useIntl();
  const confirmationFormId = useId();
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
      isNextLoading={isLoading}
      {...props}
      classes={{ content: 'h-full' }}
    >
      <div className='relative flex w-[620px] flex-1 flex-col gap-y-6'>
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
            <Avatar url={professional.user?.avatar} shadow />
            <div className='flex flex-col gap-y-1'>
              <Typography variant='body2' weight='bold'>
                {getFullName(professional.user || {})}
              </Typography>
              <Typography
                variant='small'
                weight='semibold'
                className='!text-gray'
              >
                {location?.name}
              </Typography>
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
        <div className='relative z-10 flex-1 bg-white px-6 pt-6 shadow'>
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
            <BookingForm onSubmit={handleConfirm} formId={confirmationFormId} />
          )}
        </div>
      </div>
    </DialogWizard>
  );
};
