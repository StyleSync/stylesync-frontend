import { type FC, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// components
import { TextField } from '@/modules/core/components/text-field';
import { PriceField } from '@/modules/core/components/price-field';
import { TimeField } from '@/modules/core/components/time-field';
import { Button } from '@/modules/core/components/button';
import { Icon } from '@/modules/core/components/icon';
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { Time, type TimeValue } from '@/modules/core/utils/time.utils';
import { isServiceOnProfessionalValid } from '@/modules/service/utils/service.utils';
// types
import type { ServiceOnProfessionalEditableFields } from '@/modules/service/types/service.types';
import type { ChildrenProp } from '@/modules/core/types/react.types';

import type {
  ServiceOnProfessionalEditFormProps,
  ServiceOnProfessionalFormValues,
} from './service-on-professional-edit-form.interface';
import styles from './service-on-professional-edit-form.module.scss';

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

const mapServiceOnProfessionalToFormValues = (
  data: ServiceOnProfessionalEditableFields
): ServiceOnProfessionalFormValues => ({
  title: data.title,
  duration: Time.fromMinuteDuration(data.duration).getString(),
  price: {
    value: data.price.toString(),
    currency: data.currency,
  },
});

const mapFormValuesToServiceOnProfessional = (
  values: ServiceOnProfessionalFormValues
): ServiceOnProfessionalEditableFields => ({
  title: values.title,
  currency: values.price.currency,
  price: +values.price.value,
  duration: Time.toMinuteDuration(values.duration as TimeValue),
});

const FragmentOrDialog: FC<
  ChildrenProp & { isActive: boolean; onClose: () => void }
> = ({ children, isActive, onClose }) => {
  const deviceType = useDeviceType();

  if (deviceType === 'mobile') {
    return (
      <Dialog
        isOpen={isActive}
        onOpenChange={onClose}
        classes={{
          overlay: styles.dialogOverlay,
          content: styles.dialogContent,
        }}
      >
        {children}
      </Dialog>
    );
  }

  return <>{children}</>;
};

export const ServiceOnProfessionalEditForm: FC<
  ServiceOnProfessionalEditFormProps
> = ({ isActive, data, onSubmit, onCancel, onDelete }) => {
  const deviceType = useDeviceType();
  const isNew = !isServiceOnProfessionalValid(data);
  // form
  const form = useForm<ServiceOnProfessionalFormValues>({
    defaultValues: mapServiceOnProfessionalToFormValues(data),
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    form.reset(mapServiceOnProfessionalToFormValues(data));
  }, [data, form.reset]);

  const handleSubmit = useCallback(
    (values: ServiceOnProfessionalFormValues) => {
      onSubmit(mapFormValuesToServiceOnProfessional(values));
    },
    [onSubmit]
  );

  const handleCancel = useCallback(() => {
    const formValues = mapServiceOnProfessionalToFormValues(data);
    const isInitialDataValid = validationSchema.safeParse(formValues).success;

    if (!isInitialDataValid) {
      onDelete(data.id);

      return;
    }

    form.reset(formValues);
    onCancel();
  }, [data, onCancel, onDelete, form.reset]);

  if (deviceType !== 'mobile' && !isActive) {
    return;
  }

  return (
    <FragmentOrDialog isActive={isActive} onClose={handleCancel}>
      <form className={styles.form} onSubmit={form.handleSubmit(handleSubmit)}>
        <div className={styles.title}>
          <Icon name='nails' width={18} height={18} />
          <Typography variant='body1'>
            {isNew ? 'Create' : 'Edit'} nails service
          </Typography>
        </div>
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
            onClick={handleCancel}
          />
          <Button variant='primary' text='Save' type='submit' />
        </div>
      </form>
    </FragmentOrDialog>
  );
};
