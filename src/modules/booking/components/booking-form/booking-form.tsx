import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIntl } from 'react-intl';

// components
import { TextField } from '@/modules/core/components/text-field';
import { Button } from '@/modules/core/components/button';
// type
import type { BookingFormProps } from './booking-form.interface';
// styles
import styles from './booking-form.module.scss';

const defaultValues = {
  name: '',
  lastName: '',
  phone: '',
  comment: '',
};

const bookingValidationSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().regex(/^\+\d{1,3}\d{10}$/, 'Phone number is not valid'),
  email: z.string(),
  comment: z.string(),
});

export type BookingFormValue = z.infer<typeof bookingValidationSchema>;

export const BookingForm: FC<BookingFormProps> = ({
  onClickBack,
  onSubmit,
  isLoading,
}) => {
  const intl = useIntl();

  const form = useForm<BookingFormValue>({
    defaultValues,
    resolver: zodResolver(bookingValidationSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className={styles.root}>
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
      <TextField
        {...form.register('phone')}
        error={Boolean(form.formState.errors.phone)}
        variant='input'
        label={intl.formatMessage({ id: 'booking.form.phone' })}
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
        label={intl.formatMessage({ id: 'booking.form.comment' })}
      />

      <div className={styles.btnContainer}>
        <Button
          className={styles.buttonBack}
          onClick={onClickBack}
          text={intl.formatMessage({ id: 'button.back' })}
          icon='arrow-left'
          variant='outlined'
        />
        <Button
          isLoading={isLoading}
          className={styles.buttonConfirm}
          type='submit'
          text={intl.formatMessage({ id: 'button.confirm' })}
          variant='primary'
        />
      </div>
    </form>
  );
};
