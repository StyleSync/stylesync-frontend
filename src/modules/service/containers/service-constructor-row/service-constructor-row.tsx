import { type FC, useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// components
import { Button } from '@/modules/core/components/button';
import { PriceField } from '@/modules/core/components/price-field';
import { TextField } from '@/modules/core/components/text-field';
import { TimeField } from '@/modules/core/components/time-field';
import { Typography } from '@/modules/core/components/typogrpahy';
// utils
import { Time, type TimeValue } from '@/modules/core/utils/time.utils';
// types
import type { ServiceOnProfessionalEditableFields } from '@/modules/service/types/service.types';

import type {
  ServiceConstructorRowProps,
  ServiceConstructorRowFormValues,
} from './service-constructor-row.interface';
import styles from './service-constructor-row.module.scss';

const validationSchema = z.object({
  title: z.string().min(1),
  duration: z
    .string()
    .refine((arg) => Time.toMinuteDuration(arg as TimeValue) > 0),
  price: z.object({
    value: z.string().refine((arg) => !isNaN(+arg) && +arg > 0),
    currency: z.string(),
  }),
});

const mapDataToFormValues = (
  data: ServiceOnProfessionalEditableFields
): ServiceConstructorRowFormValues => ({
  title: data.title,
  duration: Time.fromMinuteDuration(data.duration).getString(),
  price: {
    value: data.price.toString(),
    currency: data.currency,
  },
});

const mapFormValuesToData = (
  values: ServiceConstructorRowFormValues
): ServiceOnProfessionalEditableFields => ({
  title: values.title,
  currency: values.price.currency,
  price: +values.price.value,
  duration: Time.toMinuteDuration(values.duration as TimeValue),
});

export const ServiceConstructorRow: FC<ServiceConstructorRowProps> = ({
  data,
  onChange,
  onDelete,
}) => {
  // state
  const [rowState, setRowState] = useState<'edit' | 'display'>(
    validationSchema.safeParse(mapDataToFormValues(data)).success
      ? 'display'
      : 'edit'
  );
  // form
  const form = useForm<ServiceConstructorRowFormValues>({
    defaultValues: mapDataToFormValues(data),
    resolver: zodResolver(validationSchema),
  });

  const handleDeleteClick = useCallback(() => {
    onDelete(data.id);
  }, [data.id, onDelete]);

  const handleEditClick = useCallback(() => {
    setRowState('edit');
  }, []);

  const handleSubmit = useCallback(
    (values: ServiceConstructorRowFormValues) => {
      setRowState('display');
      onChange(mapFormValuesToData(values));
    },
    [onChange]
  );

  const handleEditCancel = useCallback(() => {
    const { success } = validationSchema.safeParse(data);

    if (!success) {
      onDelete(data.id);

      return;
    }

    form.reset(mapDataToFormValues(data));
  }, [data, form, onDelete]);

  return (
    <div className={styles.root}>
      {rowState === 'display' && (
        <div className={styles.display}>
          <div className={styles.info}>
            <Typography variant='body1'>{form.getValues().title}</Typography>
            <Typography variant='small' className={styles.secondaryText}>
              {form.getValues().duration}
            </Typography>
          </div>
          <div className={styles.price}>
            <Typography variant='body1'>
              {form.getValues().price.value} {form.getValues().price.currency}
            </Typography>
          </div>
          <div className={styles.actions}>
            <Button
              icon='pencil'
              variant='outlined'
              onClick={handleEditClick}
            />
            <Button icon='trash' variant='danger' onClick={handleDeleteClick} />
          </div>
        </div>
      )}
      {rowState === 'edit' && (
        <>
          <form
            className={styles.form}
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <TextField
              variant='input'
              label='Service title'
              autoFocus
              error={Boolean(form.formState.errors.title)}
              {...form.register('title')}
            />
            <Controller
              name='price'
              control={form.control}
              render={({ field, fieldState }) => (
                <PriceField
                  price={field.value.value}
                  currency={field.value.currency}
                  onCurrencyChange={(currency) =>
                    field.onChange({
                      value: form.getValues().price.value,
                      currency,
                    })
                  }
                  onPriceChange={(price) =>
                    field.onChange({
                      value: price,
                      currency: form.getValues().price.currency,
                    })
                  }
                  inputProps={{
                    label: 'Price',
                    error: Boolean(fieldState.error),
                  }}
                />
              )}
            />
            <Controller
              name='duration'
              control={form.control}
              render={({ field, fieldState }) => (
                <TimeField
                  value={field.value}
                  onChange={field.onChange}
                  inputProps={{
                    label: 'Duration',
                    error: Boolean(fieldState.error),
                  }}
                />
              )}
            />
            <div className={styles.actions}>
              <Button
                variant='secondary'
                type='button'
                text='Cancel'
                onClick={handleEditCancel}
              />
              <Button variant='primary' text='Save' type='submit' />
            </div>
          </form>
        </>
      )}
    </div>
  );
};
