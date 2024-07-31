import { type FC, useState } from 'react';
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
//styles
import styles from './add-booking-modal.module.scss';
import { mapDateToDayEnum } from '@/modules/core/utils/date.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { add } from 'date-fns';
import { type AddBookingRequestData } from './add-booking-modal.interface';

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
  date: z.string(),
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

  const [date, setDate] = useState(new Date());

  const bookingCreate = trpc.booking.create.useMutation();

  const handleConfirm = async ({
    selectedDay,
    serviceOnProfessional,
    startTime,
    duration,
    name,
    lastName,
    phone,
    email,
    ...data
  }: AddBookingRequestData) => {
    // errors
    const endTime = add(startTime, {
      hours: new Time(duration).getHours(),
      minutes: new Time(duration).getMinutes(),
    });

    bookingCreate.mutate(
      {
        ...data,
        userId: me.professional?.userId,
        guestFirstName: name,
        guestLastName: lastName,
        guestPhone: phone,
        guestEmail: email,
        date: selectedDay,
        startTime: startTime.startTime,
        endTime: endTime.toISOString(),
        serviceProfessionalId: serviceOnProfessional,
        day: mapDateToDayEnum(selectedDay),
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
        className='w-[552px] p-6 flex flex-col gap-[40px]'
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
          {/* <DateSelect value={date} onChange={() => setDate} /> */}
          {/* <TextField
            label={intl.formatMessage({ id: 'add.booking.modal.form.date' })}
            {...form.register('date')}
            error={Boolean(form.formState.errors.date)}
            variant='input'
          /> */}
          <Controller
            name='date'
            control={form.control}
            defaultValue={new Date().toISOString()}
            render={({ field }) => (
              <DateSelect
              // errors
              // value={new Date(field.value)}
              // onChange={(date) => field.onChange(date.toISOString())}
              />
            )}
          />

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
        <div className='flex gap-4 ml-auto'>
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
