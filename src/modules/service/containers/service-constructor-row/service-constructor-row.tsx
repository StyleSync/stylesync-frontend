import { type FC, useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useIntl } from 'react-intl';
import { zodResolver } from '@hookform/resolvers/zod';
// components
import { Button } from '@/modules/core/components/button';
import { PriceField } from '@/modules/core/components/price-field';
import { TextField } from '@/modules/core/components/text-field';
import { TimeField } from '@/modules/core/components/time-field';
import { Typography } from '@/modules/core/components/typogrpahy';
// types
import type { ServiceData } from '@/modules/service/types/service.types';

import type { ServiceConstructorRowProps } from './service-constructor-row.interface';
import styles from './service-constructor-row.module.scss';
import { currencies } from '@/modules/core/constants/currency.constants';

const validationSchema = z.object({
  duration: z.string(),
  title: z.string().min(1),
  price: z.object({
    value: z.string(),
    currency: z.enum(currencies as [string, ...string[]]),
  }),
});

export const ServiceConstructorRow: FC<ServiceConstructorRowProps> = ({
  data,
  onChange,
  onDelete,
}) => {
  const intl = useIntl();
  // state
  const [rowState, setRowState] = useState<'edit' | 'display'>(
    validationSchema.safeParse(data).success ? 'display' : 'edit'
  );
  // form
  const form = useForm<Omit<ServiceData, 'serviceKey' | 'id'>>({
    defaultValues: data,
    resolver: zodResolver(validationSchema),
  });

  const handleEditClick = useCallback(() => {
    setRowState('edit');
  }, []);

  const handleDeleteClick = useCallback(() => {
    onDelete(data.id);
  }, [data.id, onDelete]);

  const handleSubmit = useCallback(
    (values: Omit<ServiceData, 'serviceKey' | 'id'>) => {
      setRowState('display');
      onChange({
        id: data.id,
        serviceKey: data.serviceKey,
        ...values,
      });
    },
    [data.serviceKey, data.id, onChange]
  );

  const handleEditCancel = useCallback(() => {
    const { success } = validationSchema.safeParse(data);

    if (!success) {
      onDelete(data.id);

      return;
    }

    form.reset(data);
  }, [data, form, onDelete]);

  return (
    <div className={styles.root}>
      {rowState === 'display' && (
        <div className={styles.display}>
          <div className={styles.info}>
            <Typography variant='body1'>{form.getValues().title}</Typography>
            <Typography variant='small' className={styles.secondaryText}>
              {intl.formatMessage(
                { id: 'general.time.duration' },
                {
                  numHours: 2,
                }
              )}
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
