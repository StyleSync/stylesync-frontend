import { type FC, useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { sendGTMEvent } from '@next/third-parties/google';
import { type Currency } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useSession } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { Button } from '@/modules/core/components/button';
import { Dialog } from '@/modules/core/components/dialog';
import { EditorField } from '@/modules/core/components/editor-field';
import { PriceField } from '@/modules/core/components/price-field';
import { TextField } from '@/modules/core/components/text-field';
import { TimeField } from '@/modules/core/components/time-field-v2/time-field';
import { Typography } from '@/modules/core/components/typogrpahy';
import { showToast } from '@/modules/core/providers/toast-provider';
import {
  formatDuration,
  Time,
  type TimeValue,
} from '@/modules/core/utils/time.utils';
import { trpc } from '@/modules/core/utils/trpc.utils';
import type { ServiceOnProfessionalEditableFields } from '@/modules/service/types/service.types';

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
    currency: z.custom<Currency>(),
  }),
  description: z.string(),
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
  description: data.description || '',
});

const mapFormValuesToServiceOnProfessional = (
  values: ServiceOnProfessionalFormValues
): ServiceOnProfessionalEditableFields => ({
  title: values.title,
  currency: values.price.currency,
  price: +values.price.value,
  duration: Time.toMinuteDuration(values.duration as TimeValue),
  description: values.description || '',
});

export const ServiceOnProfessionalEditForm: FC<
  ServiceOnProfessionalEditFormProps
> = ({ isActive, data, onOpenChange }) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const isNew = data.id.startsWith('new__');
  const { data: session } = useSession();
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
  }, [data, form, form.reset]);

  const formatValue = useCallback(
    (value: string) => {
      return formatDuration(Time.toMinuteDuration(value as TimeValue), intl, {
        isShortDuration: true,
      });
    },
    [intl]
  );

  const handleSubmit = useCallback(
    (values: ServiceOnProfessionalFormValues) => {
      if (isNew) {
        serviceOnProfessionalCreateMutation.mutate(
          {
            ...mapFormValuesToServiceOnProfessional(values),
            description: values.description || '',
            serviceId: data.service.id,
          },
          {
            onSuccess: () => {
              onOpenChange(false);
              sendGTMEvent({
                event: 'service_add',
                user_id: session?.user?.id,
                user_email: session?.user?.email,
                data: {
                  title: values.title,
                  service: data?.service?.name,
                },
              });

              queryClient.invalidateQueries({
                queryKey: getQueryKey(trpc.serviceOnProfessional.list),
              });

              queryClient.invalidateQueries({
                queryKey: getQueryKey(
                  trpc.professional.getProfileCompletionStatus
                ),
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
          description: values.description || '',
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
      onOpenChange,
      queryClient,
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
      <div className='flex flex-col gap-y-10'>
        <Typography className='text-dark' variant='subtitle'>
          {isNew
            ? intl.formatMessage({ id: 'serviceOn.professional.edit.form.add' })
            : intl.formatMessage({
                id: 'serviceOn.professional.edit.form.edit',
              })}{' '}
          {intl.formatMessage({
            id: 'serviceOn.professional.edit.form.service',
          })}
        </Typography>
        <form
          className='flex h-full flex-col gap-y-6'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <TextField
            variant='input'
            label={intl.formatMessage({
              id: 'serviceOn.professional.edit.input.title',
            })}
            autoFocus
            error={Boolean(form.formState.errors.title)}
            {...form.register('title')}
          />
          <div className='flex flex-col gap-2'>
            <div className='flex gap-x-4'>
              <Controller
                name='duration'
                control={form.control}
                render={({ field, fieldState }) => (
                  <TimeField
                    value={field.value}
                    formatValue={formatValue}
                    onChange={field.onChange}
                    inputProps={{
                      label: intl.formatMessage({
                        id: 'serviceOn.professional.edit.duration.label',
                      }),
                      error: Boolean(fieldState.error),
                      className: '!pr-3',
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
                      label: intl.formatMessage({
                        id: 'serviceOn.professional.edit.price.label',
                      }),
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
                <EditorField
                  id={data.id}
                  value={field.value}
                  onChange={field.onChange}
                  fixedHeight={400}
                  label={intl.formatMessage({
                    id: 'serviceOn.professional.edit.description',
                  })}
                />
              )}
            />
          </div>

          <div className={styles.btnContainer}>
            <Button
              variant='secondary'
              type='button'
              text={intl.formatMessage({ id: 'button.cancel' })}
              onClick={handleCancel}
            />
            <Button
              variant='primary'
              text={intl.formatMessage({ id: 'button.save' })}
              type='submit'
              isLoading={
                serviceOnProfessionalUpdateMutation.isPending ||
                serviceOnProfessionalCreateMutation.isPending
              }
            />
          </div>
        </form>
      </div>
    </Dialog>
  );
};
