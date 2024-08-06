import { type FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBoolean } from 'usehooks-ts';

// components
import { Dialog } from '@/modules/core/components/dialog';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { TextField } from '@/modules/core/components/text-field';
import { TimeField } from '@/modules/core/components/time-field';
import { DateSelect } from '@/modules/core/components/date-select';
import { DropdownMenu } from '@/modules/core/components/dropdown-menu';
import { Icon } from '@/modules/core/components/icon';
import { PhoneField } from '@/modules/core/components/phone-field';

// utils
import {
  Time,
  type TimeValue,
  formatDuration,
} from '@/modules/core/utils/time.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';
// type
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
// styles
import styles from './add-booking-modal.module.scss';
import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
import { add, set } from 'date-fns';
import type { ServiceOnProfessional } from '@/modules/service/types/service.types';

const defaultValues = {
  date: new Date(),
  startTime: '',
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  description: '',
};

const bookingValidationSchema = z.object({
  date: z.date(),
  startTime: z.string(),
  guestName: z.string(),
  guestPhone: z
    .string()
    .regex(/^\+\d{1,3}\d{10}$/, 'Phone number is not valid'),
  guestEmail: z.string().email().or(z.literal('')),
  description: z.string(),
});

export type AddBookingValue = z.infer<typeof bookingValidationSchema>;

export const AddBookingModal: FC<Omit<DialogProps, 'children'>> = ({
  ...props
}) => {
  const intl = useIntl();
  const isOpenDropdown = useBoolean(false);
  // state
  const [service, setService] = useState<ServiceOnProfessional | null>(null);
  // mutation
  const bookingCreate = trpc.booking.create.useMutation();

  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  const [serviceList] = trpc.serviceOnProfessional.list.useSuspenseQuery({
    limit: 10,
    offset: 0,
    professionalId: me.professional?.id,
  });

  // form
  const form = useForm<AddBookingValue>({
    defaultValues,
    resolver: zodResolver(bookingValidationSchema),
  });

  const handleModalClose = () => {
    if (props.onOpenChange) {
      props.onOpenChange(false);
    }
  };

  const toggleDropdown = () => {
    if (isOpenDropdown.value) {
      isOpenDropdown.setFalse();
    } else {
      isOpenDropdown.setTrue();
    }
  };

  const handleConfirm = async ({
    startTime,
    date,
    guestEmail,
    guestPhone,
    guestName,
  }: AddBookingValue) => {
    if (!service) return;

    const _startTime = set(date, {
      hours: new Time(startTime as TimeValue).getHours(),
      minutes: new Time(startTime as TimeValue).getMinutes(),
    });
    const _endTime = add(date, {
      hours: new Time(formatDuration(service.duration) as TimeValue).getHours(),
      minutes: new Time(
        formatDuration(service.duration) as TimeValue
      ).getMinutes(),
    });

    bookingCreate.mutate(
      {
        userId: me.professional?.userId,
        guestFirstName: guestName,
        guestPhone,
        guestEmail,
        date: date.toISOString(),
        startTime: _startTime.toISOString(),
        endTime: _endTime.toISOString(),
        serviceProfessionalId: service?.id || '',
        day: mapDateToDayEnum(date),
      },
      {
        onError: () => {
          showToast({
            variant: 'error',
            title: intl.formatMessage({
              id: 'add.booking.modal.toast.error.title',
            }),
            description: intl.formatMessage({
              id: 'add.booking.modal.toast.error.description',
            }),
          });
        },
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: intl.formatMessage({
              id: 'add.booking.modal.toast.success.title',
            }),
            description: intl.formatMessage({
              id: 'add.booking.modal.toast.success.description',
            }),
          });
          props.onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog {...props} classes={{ content: styles.content }} disableAutofocus>
      <form
        onSubmit={form.handleSubmit(handleConfirm)}
        className='flex w-[552px] flex-col gap-[40px] p-6'
      >
        <Typography variant='subtitle'>
          {intl.formatMessage({ id: 'add.booking.modal.title' })}
        </Typography>
        <div className='flex flex-col gap-[30px]'>
          <DropdownMenu
            isOpen={isOpenDropdown.value}
            onClose={isOpenDropdown.setFalse}
            items={serviceList.map((item) => ({
              id: item.professional.id,
              text: item.title,
              data: item,
            }))}
            trigger={
              <div className='relative cursor-pointer' onClick={toggleDropdown}>
                <TextField
                  className='!pointer-events-none'
                  value={service?.title || ''}
                  label={intl.formatMessage({
                    id: 'add.booking.modal.form.service',
                  })}
                  variant='input'
                />
                <Icon
                  className={`absolute text-gray right-7 top-1/2 transform -translate-y-1/2 ${isOpenDropdown.value ? 'rotate-180' : ''}`}
                  width={15}
                  height={15}
                  name='chevron-bottom'
                />
              </div>
            }
            onSelect={({ data }) => {
              setService(data as ServiceOnProfessional);
              isOpenDropdown.setFalse();
            }}
            popoverProps={{
              forceTriggerWidth: true,
              classes: {
                content: 'max-h-[400px] overflow-y-auto',
              },
            }}
          />
          <Controller
            control={form.control}
            name='date'
            render={({ field }) => (
              <DateSelect value={field.value} onChange={field.onChange} />
            )}
          />

          <Controller
            name='startTime'
            control={form.control}
            render={({ field, fieldState }) => (
              <TimeField
                value={field.value}
                onChange={field.onChange}
                inputProps={{
                  label: intl.formatMessage({
                    id: 'add.booking.modal.form.start.time',
                  }),
                  error: Boolean(fieldState.error),
                }}
              />
            )}
          />

          <TextField
            {...form.register('guestName')}
            error={Boolean(form.formState.errors.guestName)}
            variant='input'
            label={intl.formatMessage({
              id: 'add.booking.modal.form.guest.name',
            })}
          />

          <Controller
            control={form.control}
            name='guestPhone'
            render={({ field }) => {
              return (
                <PhoneField
                  error={Boolean(form.formState.errors.guestPhone)}
                  label={intl.formatMessage({
                    id: 'add.booking.modal.form.guest.phone',
                  })}
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
          <TextField
            {...form.register('guestEmail')}
            error={Boolean(form.formState.errors.guestEmail)}
            variant='input'
            label={intl.formatMessage({
              id: 'add.booking.modal.form.guest.email',
            })}
          />
          <TextField
            {...form.register('description')}
            label={intl.formatMessage({
              id: 'add.booking.modal.form.description',
            })}
            error={Boolean(form.formState.errors.description)}
            variant='textarea'
            style={{ height: 200, resize: 'none' }}
          />
        </div>
        <div className='ml-auto flex gap-4'>
          <Button
            variant='secondary'
            text={intl.formatMessage({ id: 'button.cancel' })}
            onClick={handleModalClose}
          />
          <Button
            type='submit'
            text={intl.formatMessage({ id: 'button.save' })}
          />
        </div>
      </form>
    </Dialog>
  );
};
