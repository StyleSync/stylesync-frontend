import { type FC, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// components
import { TextField } from '@/modules/core/components/text-field';
import { PriceField } from '@/modules/core/components/price-field';
import { TimeField } from '@/modules/core/components/time-field';
import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { Typography } from '@/modules/core/components/typogrpahy';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { Time, type TimeValue } from '@/modules/core/utils/time.utils';
// types
import type { ServiceOnProfessionalEditableFields } from '@/modules/service/types/service.types';
import type {
  ServiceOnProfessionalEditFormProps,
  ServiceOnProfessionalFormValues,
} from './service-on-professional-edit-form.interface';
import styles from './service-on-professional-edit-form.module.scss';
import { showToast } from '@/modules/core/providers/toast-provider';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { EditorComponent } from '@/modules/core/components/editor';

const validationSchema = z.object({
  title: z.string().min(1),
  duration: z
    .string()
    .refine((arg) => Time.toMinuteDuration(arg as TimeValue) > 0),
  price: z.object({
    value: z.string().refine((arg) => !isNaN(+arg) && +arg > 0),
    currency: z.string(),
  }),
  description: z.string().min(1),
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
  description: data.description,
});

const mapFormValuesToServiceOnProfessional = (
  values: ServiceOnProfessionalFormValues
): ServiceOnProfessionalEditableFields => ({
  title: values.title,
  currency: values.price.currency,
  price: +values.price.value,
  duration: Time.toMinuteDuration(values.duration as TimeValue),
  description: values.description,
});

export const ServiceOnProfessionalEditForm: FC<
  ServiceOnProfessionalEditFormProps
> = ({ isActive, data, onOpenChange }) => {
  const queryClient = useQueryClient();
  const isNew = data.id.startsWith('new__');
  // form
  const form = useForm<ServiceOnProfessionalFormValues>({
    defaultValues: mapServiceOnProfessionalToFormValues(data),
    resolver: zodResolver(validationSchema),
  });
  // mutation
  const serviceOnProfessionalUpdateMutation =
    trpc.serviceOnProfessional.update.useMutation();
  const serviceOnProfessionalCreateMutation =
    trpc.serviceOnProfessional.create.useMutation();

  useEffect(() => {
    form.reset(mapServiceOnProfessionalToFormValues(data));
  }, [data, form.reset]);

  const handleSubmit = useCallback(
    (values: ServiceOnProfessionalFormValues) => {
      if (isNew) {
        serviceOnProfessionalCreateMutation.mutate(
          {
            ...mapFormValuesToServiceOnProfessional(values),
            serviceId: data.service.id,
          },
          {
            onSuccess: () => {
              onOpenChange(false);

              queryClient.invalidateQueries({
                queryKey: getQueryKey(trpc.serviceOnProfessional.list),
              });
            },
            onError: (err) => {
              showToast({
                variant: 'error',
                title: err.message,
                description: '',
              });
            },
          }
        );

        return;
      }

      serviceOnProfessionalUpdateMutation.mutate(
        {
          ...data,
          ...mapFormValuesToServiceOnProfessional(values),
        },
        {
          onSuccess: () => {
            onOpenChange(false);

            queryClient.invalidateQueries({
              queryKey: getQueryKey(trpc.serviceOnProfessional.list),
            });
          },
          onError: (err) => {
            showToast({
              variant: 'error',
              title: err.message,
              description: '',
            });
          },
        }
      );
    },
    [
      isNew,
      data,
      serviceOnProfessionalCreateMutation,
      serviceOnProfessionalUpdateMutation,
    ]
  );

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog
      isOpen={isActive}
      onOpenChange={(isOpen) => {
        if (!isOpen && form.formState.isDirty) {
          const isConfirmed = confirm('you have unsaved changes….');

          if (!isConfirmed) {
            return;
          }
        }

        onOpenChange(isOpen);
      }}
      classes={{
        overlay: styles.dialogOverlay,
        content: styles.dialogContent,
      }}
    >
      <div className='flex-col gap-y-10 grid grid-rows-[auto_1fr] h-fit'>
        <Typography className='text-dark' variant='subtitle'>
          {isNew ? 'Add' : 'Edit'} service
        </Typography>
        <form
          className='flex flex-col gap-y-6'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <TextField
            variant='input'
            label='Service title'
            autoFocus
            error={Boolean(form.formState.errors.title)}
            {...form.register('title')}
          />
          <div className='flex gap-x-4 pb-4'>
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
          </div>

          <Controller
            name='description'
            control={form.control}
            render={({ field }) => (
              <EditorComponent
                id={data.id}
                value={field.value}
                onChange={field.onChange}
                fixedHeight={400}
              />
            )}
          />

          <div className='flex gap-x-2 ml-auto'>
            <Button
              variant='secondary'
              type='button'
              text='Cancel'
              onClick={handleCancel}
            />
            <Button
              variant='primary'
              text='Save'
              type='submit'
              isLoading={
                serviceOnProfessionalUpdateMutation.isLoading ||
                serviceOnProfessionalCreateMutation.isLoading
              }
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};
