import { type FC, useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { AvatarSelect } from '@/modules/core/components/avatar-select';
import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { TextField } from '@/modules/core/components/text-field';
import { PRISMA_ERRORS } from '@/modules/core/constants/prisma-errors.constants';
import { useDebounce } from '@/modules/core/hooks/use-debounce';
import { useImageInputState } from '@/modules/core/hooks/use-image-input-state';
import { getPrismaErrorMessage } from '@/modules/user/utils/get-prisma-error-message';

import type {
  EditClientInfoModalProps,
  EditClientInfoModalValues,
} from './edit-client-info-modal.interface';

const defaultValues: EditClientInfoModalValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  notes: '',
};
const THOUSAND = 1000;
const THIRTY_TWO = 32;
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/;

const validationSchema: z.Schema<EditClientInfoModalValues> = z.object({
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
  email: z.string().optional(),
  notes: z.string().max(THOUSAND, 'validation.about.maxLength'),
});

export const EditClientInfoModal: FC<EditClientInfoModalProps> = ({
  isOpen,
  onOpenChange,
  initialValues,
  onSubmit,
}) => {
  const intl = useIntl();
  // avatar
  const image = useImageInputState(initialValues?.image);

  const { register, handleSubmit, watch, formState, setError, reset } =
    useForm<EditClientInfoModalValues>({
      defaultValues,
      resolver: zodResolver(validationSchema),
    });

  const aboutValue = watch('notes', '');
  const debounceInformation = useDebounce(aboutValue);

  const getErrorMessage = (errorKey: string | undefined) => {
    if (errorKey) {
      return intl.formatMessage({ id: errorKey });
    }
  };

  const handleError = useCallback(
    (error: any) => {
      if (
        getPrismaErrorMessage(error, 'phone', PRISMA_ERRORS.UNIQUE_DUPLICATE)
      ) {
        setError('phone', {
          message: intl.formatMessage({
            id: 'onboard.about.toast.error.title.phone',
          }),
        });
      }

      if (
        getPrismaErrorMessage(error, 'phone', PRISMA_ERRORS.UNIQUE_DUPLICATE)
      ) {
        setError('phone', {
          message: intl.formatMessage({
            id: 'onboard.about.toast.error.title.phone',
          }),
        });
      }
    },
    [intl, setError]
  );

  const handleCloseModal = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleSubmitForm = useCallback(
    async (
      data: EditClientInfoModalValues & { image?: File | string | null }
    ) => {
      if (onSubmit) {
        await onSubmit(data, handleError);
      }
    },
    [onSubmit, handleError]
  );

  useEffect(() => {
    reset({ ...defaultValues, ...initialValues });
  }, [initialValues, reset]);

  return (
    <DialogFullScreen
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classes={{
        overlay: 'z-[199]',
        content: 'w-full p-5',
      }}
      applyMobileBottomTabPadding
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className='flex w-full flex-col'
      >
        <Button
          variant='outlined'
          icon='chevron-left'
          className='-ml-4 !border-none !pb-4 !text-dark'
          onClick={handleCloseModal}
        />

        <div
          className='mt-7 flex flex-1 flex-col items-center gap-7 overflow-y-auto pb-6'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <AvatarSelect
            className='flex flex-col'
            value={image.preview}
            onChange={image.onChange}
            onRemove={image.onRemove}
          />
          <TextField
            {...register('firstName')}
            error={getErrorMessage(formState.errors.firstName?.message)}
            variant='input'
            label={intl.formatMessage({ id: 'client.name' })}
          />
          <TextField
            {...register('lastName')}
            error={getErrorMessage(formState.errors.lastName?.message)}
            variant='input'
            label={intl.formatMessage({ id: 'client.lastName' })}
          />
          <TextField
            {...register('phone')}
            error={getErrorMessage(formState.errors.firstName?.message)}
            className='!w-full'
            label={intl.formatMessage({ id: 'client.phone' })}
            variant='input'
          />
          <TextField
            {...register('email')}
            error={formState.errors.email?.message}
            variant='input'
            label={intl.formatMessage({ id: 'client.email' })}
          />
          <TextField
            {...register('notes')}
            error={formState.errors.notes?.message}
            charCount={debounceInformation?.length}
            showCharacterCount
            maxCharacterCount={1000}
            variant='textarea'
            label={intl.formatMessage({ id: 'client.notes' })}
            style={{ height: 200, resize: 'none' }}
          />
        </div>

        <div className='mt-auto'>
          <Button
            // isLoading={isPending}
            type='submit'
            className='!mt-auto !w-full'
            text={intl.formatMessage({ id: 'button.save' })}
          />
        </div>
      </form>
    </DialogFullScreen>
  );
};
