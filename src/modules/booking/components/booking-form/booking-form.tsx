import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// components
import { TextField } from '@/modules/core/components/text-field';
import { Button } from '@/modules/core/components/button';

// type
import type {
  BookingFormValue,
  BookingFormProps,
} from './booking-form.interface';

import styles from './booking-form.module.scss';

const defaultValues: BookingFormValue = {
  name: '',
  phone: '',
  email: '',
  comment: '',
};

const validationSchema: z.Schema<BookingFormValue> = z.object({
  name: z.string().min(1),
  phone: z.string().refine((value) => /^\+\d{1,4}\d{1,14}$/.test(value), {
    message: 'Example, +12345678901234',
  }),
  email: z.string(),
  comment: z.string(),
});

const handleBook = (data: BookingFormValue) => {
  console.log('ss', data);
};

export const BookingForm: FC<BookingFormProps> = ({ onClickBack }) => {
  const form = useForm<BookingFormValue>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(handleBook)} className={styles.root}>
      <TextField
        {...form.register('name')}
        error={Boolean(form.formState.errors.name)}
        variant='input'
        label='Name*'
      />
      <TextField
        {...form.register('phone')}
        error={Boolean(form.formState.errors.phone)}
        variant='input'
        label='Phone*'
      />
      <TextField
        {...form.register('email')}
        error={Boolean(form.formState.errors.email)}
        variant='input'
        label='Email*'
      />
      <TextField
        {...form.register('comment')}
        error={Boolean(form.formState.errors.comment)}
        variant='textarea'
        label='Comment'
      />

      <div className={styles.btnContainer}>
        <Button
          className={styles.buttonBack}
          onClick={onClickBack}
          text='Back'
          icon='arrow-left'
          variant='outlined'
        />
        <Button
          className={styles.buttonConfirm}
          type='submit'
          text='Confirm'
          variant='primary'
        />
      </div>
    </form>
  );
};
