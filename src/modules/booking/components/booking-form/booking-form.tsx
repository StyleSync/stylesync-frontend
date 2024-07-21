import { type FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIntl } from 'react-intl';
// components
import { TextField } from '@/modules/core/components/text-field';
import { PhoneField } from '@/modules/core/components/phone-field';
// type
import type { BookingFormProps } from './booking-form.interface';
// styles
import styles from './booking-form.module.scss';

const defaultValues = {
  name: '',
  lastName: '',
  phone: '',
  email: '',
  comment: '',
  email: '',
};

const bookingValidationSchema = z.object({
  name: z.string().min(1),
  lastName: z.string(),
  phone: z.string().regex(/^\+\d{1,3}\d{10}$/, 'Phone number is not valid'),
  email: z.string().email().or(z.literal('')),
  comment: z.string(),
});

export type BookingFormValue = z.infer<typeof bookingValidationSchema>;

export const BookingForm: FC<BookingFormProps> = ({ onSubmit, formId }) => {
  const intl = useIntl();

  const form = useForm<BookingFormValue>({
    defaultValues,
    resolver: zodResolver(bookingValidationSchema),
  });

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className={styles.root}
    >
      <span className='text-xs text-gray'>
        {intl.formatMessage({ id: 'booking.metadata.fillPersonalInfo' })}
      </span>
      <TextField
        {...form.register('name')}
        error={Boolean(form.formState.errors.name)}
        variant='input'
        label={intl.formatMessage({ id: 'booking.form.name' })}
      />
      <TextField
        {...form.register('lastName')}
        error={Boolean(form.formState.errors.lastName)}
        variant='input'
        label={intl.formatMessage({ id: 'booking.form.lastName' })}
      />

      <Controller
        control={form.control}
        name='phone'
        render={({ field }) => {
          return (
            <PhoneField
              error={Boolean(form.formState.errors.phone)}
              label={intl.formatMessage({ id: 'booking.form.phone' })}
              value={field.value}
              onChange={field.onChange}
            />
          );
        }}
      />
      <TextField
        {...form.register('email')}
        error={Boolean(form.formState.errors.email)}
        variant='input'
        label={intl.formatMessage({ id: 'booking.form.email' })}
      />
      <TextField
        {...form.register('comment')}
        error={Boolean(form.formState.errors.comment)}
        variant='textarea'
        classes={{
          container: 'flex-1 flex',
        }}
        className='flex-1 resize-none'
        label={intl.formatMessage({ id: 'booking.form.comment' })}
      />
    </form>
  );
};
