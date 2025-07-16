import { type FC, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { AvatarSelect } from '@/modules/core/components/avatar-select';
import { Button } from '@/modules/core/components/button';
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { TextField } from '@/modules/core/components/text-field';
import { useDebounce } from '@/modules/core/hooks/use-debounce';
import { useImageInputState } from '@/modules/core/hooks/use-image-input-state';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { useAvatarUploadMutation } from '@/modules/user/hooks/use-avatar-upload-mutation';

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
  email: z.string(),
  notes: z.string().max(THOUSAND, 'validation.about.maxLength'),
});

export const EditClientInfoModal: FC<EditClientInfoModalProps> = ({
  isOpen,
  onOpenChange,
  clientId,
  initialValues,
}) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  // avatar
  const avatar = useImageInputState(initialValues?.image);
  const avatarUpload = useAvatarUploadMutation();
  // query
  const { mutate: clientInfoUpdate, isPending } =
    trpc.client.update.useMutation();

  const { data: client } = trpc.client.get.useQuery(
    { id: clientId ?? '' },
    { enabled: !!clientId }
  );

  const { register, handleSubmit, watch, formState, reset } =
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

  const handleSubmitForm = async (data: EditClientInfoModalValues) => {
    let imageUrl: string | null = null;

    if (avatar.file) {
      if (typeof avatar.file === 'object') {
        const uploaded = await avatarUpload.mutateAsync(avatar.file);

        imageUrl = uploaded.url;
      } else if (typeof avatar.file === 'string') {
        imageUrl = avatar.file;
      }
    }

    clientInfoUpdate(
      {
        ...data,
        image: imageUrl ?? undefined,
        id: client?.id ?? '',
      },
      {
        onSuccess: () => {
          showToast({
            variant: 'success',
            title: intl.formatMessage({
              id: 'client.info.update.success',
            }),
          });

          queryClient.invalidateQueries({
            queryKey: getQueryKey(trpc.client.list),
          });

          onOpenChange?.(false);
        },
      }
    );
  };

  const handleCloseModal = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  useEffect(() => {
    reset({ ...defaultValues, ...initialValues });
  }, [initialValues, reset]);

  return (
    <DialogFullScreen
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classes={{
        overlay: 'z-[199]',
        content: 'w-full p-6',
      }}
      applyMobileBottomTabPadding
    >
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className='flex w-full flex-col'
      >
        <Button
          variant='outlined'
          icon='arrow-left'
          className='-ml-2 !border-none !text-dark'
          onClick={handleCloseModal}
        />

        <div className='mt-7 flex flex-1 flex-col items-center gap-7'>
          <AvatarSelect
            className='flex flex-col'
            value={avatar.preview}
            onChange={avatar.onChange}
            onRemove={avatar.onRemove}
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
            isLoading={isPending}
            type='submit'
            className='!mt-auto !w-full'
            text={intl.formatMessage({ id: 'button.save' })}
          />
        </div>
      </form>
    </DialogFullScreen>
  );
};
