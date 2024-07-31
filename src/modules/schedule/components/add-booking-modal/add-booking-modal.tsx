import { type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// components
import { Dialog } from '@/modules/core/components/dialog';
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { TextField } from '@/modules/core/components/text-field';
import { TimeField } from '@/modules/core/components/time-field';
import { DateSelect } from '@/modules/core/components/date-select';
// utils
import { Time, type TimeValue } from '@/modules/core/utils/time.utils';
// type
import { type DialogProps } from '@/modules/core/components/dialog/dialog.interface';
// styles
import styles from './add-booking-modal.module.scss';
import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { add, set } from 'date-fns';

const defaultValues = {
  serviceName: '',
  date: '',
  startTime: '',
  duration: '',
  guestName: '',
  guestEmail: '',
  guestPhone: '',
  description: '',
};

const bookingValidationSchema = z.object({
  serviceName: z.string().min(1),
  date: z.date(),
  startTime: z.string(),
  duration: z
    .string()
    .refine((arg) => Time.toMinuteDuration(arg as TimeValue) > 0),
  guestName: z.string(),
  guestPhone: z
    .string()
    .regex(/^\+\d{1,3}\d{10}$/, 'Phone number is not valid'),
  guestEmail: z.string().email().or(z.literal('')),
  description: z.string(),
});

// Do not infer type in this place.
export type AddBookingValue = z.infer<typeof bookingValidationSchema>;

export const AddBookingModal: FC<Omit<DialogProps, 'children'>> = ({
  ...props
}) => {
  const intl = useIntl();

  const [me] = trpc.user.me.useSuspenseQuery({ expand: ['professional'] });

  const form = useForm<AddBookingValue>({
    defaultValues,
    resolver: zodResolver(bookingValidationSchema),
  });

  const handleModalClose = () => {
    if (props.onOpenChange) {
      props.onOpenChange(false);
    }
  };

  const bookingCreate = trpc.booking.create.useMutation();

  const handleConfirm = async ({
    startTime,
    duration,
    date,
    guestEmail,
    guestPhone,
    guestName,
    serviceName,
  }: AddBookingValue) => {
    const _startTime = set(date, {
      hours: new Time(startTime as TimeValue).getHours(),
      minutes: new Time(startTime as TimeValue).getMinutes(),
    });
    const _endTime = add(date, {
      hours: new Time(duration as TimeValue).getHours(),
      minutes: new Time(duration as TimeValue).getMinutes(),
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
        // todo: add dropdown to select service on professional (instead of service name field)
        serviceProfessionalId: serviceName,
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
        },
      }
    );
  };

  return (
    <Dialog {...props} classes={{ content: styles.content }}>
      <form
        onSubmit={form.handleSubmit(handleConfirm)}
        className='flex w-[552px] flex-col gap-[40px] p-6'
      >
        <Typography variant='subtitle'>
          {intl.formatMessage({ id: 'add.booking.modal.title' })}
        </Typography>
        <div className='flex flex-col gap-[30px]'>
          <TextField
            label={intl.formatMessage({ id: 'add.booking.modal.form.service' })}
            {...form.register('serviceName')}
            error={Boolean(form.formState.errors.serviceName)}
            variant='input'
          />
          <Controller
            control={form.control}
            name='date'
            render={({ field }) => (
              <DateSelect value={field.value} onChange={field.onChange} />
            )}
          />
          {/* <TextField
            label={intl.formatMessage({ id: 'add.booking.modal.form.date' })}
            {...form.register('date')}
            error={Boolean(form.formState.errors.date)}
            variant='input'
          /> */}

          <div className='flex gap-4'>
            <Controller
              name='duration'
              control={form.control}
              render={({ field, fieldState }) => (
                <TimeField
                  value={field.value}
                  onChange={field.onChange}
                  inputProps={{
                    label: intl.formatMessage({
                      id: 'add.booking.modal.form.duration',
                    }),
                    error: Boolean(fieldState.error),
                  }}
                />
              )}
            />
          </div>
          <TextField
            {...form.register('guestName')}
            error={Boolean(form.formState.errors.guestName)}
            variant='input'
            label={intl.formatMessage({
              id: 'add.booking.modal.form.guest.name',
            })}
          />
          <TextField
            {...form.register('guestPhone')}
            error={Boolean(form.formState.errors.guestPhone)}
            variant='input'
            label={intl.formatMessage({
              id: 'add.booking.modal.form.guest.phone',
            })}
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
