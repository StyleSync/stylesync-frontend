import { type FC, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { Checkbox } from '@/modules/core/components/checkbox';
import { PhoneField } from '@/modules/core/components/phone-field';
import { TextField } from '@/modules/core/components/text-field';
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { BookingFormProps } from './booking-form.interface';

import styles from './booking-form.module.scss';

const defaultValues = {
  name: '',
  lastName: '',
  phone: '',
  email: '',
  guestComment: '',
  termsAccepted: false,
};

const bookingValidationSchema = z.object({
  name: z.string().min(1),
  lastName: z.string(),
  phone: z.string().regex(/^\+\d{1,3}\d{10}$/, 'Phone number is not valid'),
  email: z.string().email().or(z.literal('')),
  guestComment: z.string(),
  termsAccepted: z
    .boolean()
    .refine((value) => value === true, 'booking.form.terms.accepted'),
});

export type BookingFormValue = z.infer<typeof bookingValidationSchema>;

export const BookingForm: FC<BookingFormProps> = ({ onSubmit, formId }) => {
  const intl = useIntl();

  const { data: me } = trpc.user.me.useQuery({
    expand: ['professional'],
  });

  const form = useForm<BookingFormValue>({
    defaultValues: {
      ...defaultValues,
      name: me?.firstName || '',
      lastName: me?.lastName || '',
      phone: me?.phone || '',
      email: me?.email || '',
      termsAccepted: !!me,
    },
    resolver: zodResolver(bookingValidationSchema),
  });

  const { setValue } = form;

  useEffect(() => {
    if (me) {
      setValue('name', me.firstName || '');
      setValue('lastName', me.lastName || '');
      setValue('phone', me.phone || '');
      setValue('email', me.email || '');
    }
  }, [me, setValue]);

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
        {...form.register('guestComment')}
        error={Boolean(form.formState.errors.guestComment)}
        variant='textarea'
        classes={{
          container: 'flex-1 flex',
        }}
        className='flex-1 resize-none'
        label={intl.formatMessage({ id: 'booking.form.comment' })}
      />

      {me?.userType !== 'CUSTOMER' && me?.userType !== 'PROFESSIONAL' && (
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1'>
            <Controller
              control={form.control}
              name='termsAccepted'
              render={({ field }) => {
                return (
                  <Checkbox
                    error={Boolean(form.formState.errors.termsAccepted)}
                    value={field.value}
                    onChange={field.onChange}
                    size='small'
                  />
                );
              }}
            />
            <span className='text-sm'>
              {intl.formatMessage({ id: 'booking.form.accept' })}{' '}
              <a
                href='/app/privacy/policy'
                target='_blank'
                className='cursor-pointer text-primary underline underline-offset-1'
              >
                {intl.formatMessage({ id: 'booking.form.policy' })}
              </a>{' '}
              {intl.formatMessage({ id: 'booking.form.and' })}{' '}
              <a
                href='/app/privacy/terms'
                target='_blank'
                className='cursor-pointer text-primary underline underline-offset-1'
              >
                {' '}
                {intl.formatMessage({ id: 'booking.form.terms' })}
              </a>
            </span>
          </div>

          {form.formState.errors.termsAccepted && (
            <span className='pl-2 text-xs text-destructive'>
              {intl.formatMessage({
                id: form.formState.errors.termsAccepted.message,
              })}
            </span>
          )}
        </div>
      )}
    </form>
  );
};
