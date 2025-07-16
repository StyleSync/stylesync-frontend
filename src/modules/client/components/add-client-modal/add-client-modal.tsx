import { type FC, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { TextField } from '@/modules/core/components/text-field';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';

import type {
  AddClientModalProps,
  AddClientModalValues,
} from './add-client-modal.interface';

import styles from './add-client-modal.module.scss';

const THIRTY_TWO = 32;
const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/;
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const defaultValues: AddClientModalValues = {
  firstName: '',
  lastName: '',
  phone: '',
};

const validationSchema: z.Schema<AddClientModalValues> = z.object({
  firstName: z
    .string()
    .min(2, 'validation.firstName.minLength')
    .max(THIRTY_TWO, 'validation.firstName.maxLength')
    .regex(nameRegex, 'validation.firstName.invalidCharacters')
    .refine(
      (value) => /^[A-ZА-ЯІЇЄҐ]/.test(value),
      'validation.firstName.firstLetterCapitalized'
    ),
  lastName: z
    .string()
    .min(2, 'validation.lastName.minLength')
    .max(THIRTY_TWO, 'validation.lastName.maxLength')
    .regex(nameRegex, 'validation.lastName.invalidCharacters')
    .refine(
      (value) => /^[A-ZА-ЯІЇЄҐ]/.test(value),
      'validation.firstName.firstLetterCapitalized'
    ),
  phone: z
    .string()
    .min(1, 'validation.phone.required')
    .regex(phoneRegex, 'validation.phone.invalid'),
});

export const AddClientModal: FC<AddClientModalProps> = ({
  isOpen,
  onOpenChange,
  trigger,
}) => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const createClientMutation = trpc.client.create.useMutation();

  const { register, handleSubmit, formState, reset } =
    useForm<AddClientModalValues>({
      defaultValues,
      resolver: zodResolver(validationSchema),
    });

  const onSubmit = (data: AddClientModalValues) => {
    createClientMutation.mutate(data, {
      onSuccess: () => {
        showToast({
          variant: 'success',
          title: 'Клієнта додано',
        });

        queryClient.invalidateQueries({
          queryKey: getQueryKey(trpc.client.list),
        });

        onOpenChange(false);
      },
    });
  };

  const getErrorMessage = (errorKey: string | undefined) => {
    if (errorKey) {
      return intl.formatMessage({ id: errorKey });
    }
  };

  const handleCloseModal = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset({ ...defaultValues });
    }
  }, [reset, isOpen]);

  return (
    <DialogFullScreen
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classes={{
        overlay: styles.dialogOverlay,
        content: styles.dialogContent,
      }}
      applyMobileBottomTabPadding
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col'>
        <Button
          variant='outlined'
          icon='arrow-left'
          className='-ml-2 !border-none !text-dark'
          onClick={handleCloseModal}
        />
        <h2 className='mt-3 text-2xl font-medium text-dark'>
          {intl.formatMessage({ id: 'client.add.title' })}
        </h2>

        <div className='mt-14 flex flex-1 flex-col gap-7'>
          <TextField
            {...register('phone')}
            error={getErrorMessage(formState.errors.phone?.message)}
            className='!w-full'
            label={intl.formatMessage({ id: 'client.phone' })}
            variant='input'
          />
          <TextField
            {...register('firstName')}
            error={getErrorMessage(formState.errors.firstName?.message)}
            label={intl.formatMessage({ id: 'client.name' })}
            variant='input'
          />
          <TextField
            {...register('lastName')}
            error={getErrorMessage(formState.errors.lastName?.message)}
            label={intl.formatMessage({ id: 'client.lastName' })}
            variant='input'
          />
        </div>

        <div className='mt-auto'>
          <Button
            isLoading={createClientMutation.isPending}
            type='submit'
            className='!mt-auto !w-full'
            text={intl.formatMessage({ id: 'button.save' })}
          />
        </div>
      </form>
    </DialogFullScreen>
  );
};
