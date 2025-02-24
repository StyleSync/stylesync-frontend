import { memo, useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { AvatarSelect } from '@/modules/core/components/avatar-select';
import { NickNameField } from '@/modules/core/components/nickname-field';
import { PhoneField } from '@/modules/core/components/phone-field';
import { TextField } from '@/modules/core/components/text-field';
import { PRISMA_ERRORS } from '@/modules/core/constants/prisma-errors.constants';
import { useImageInputState } from '@/modules/core/hooks/use-image-input-state';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { getPrismaErrorMessage } from '@/modules/user/utils/get-prisma-error-message';

import type {
  AboutProfessionalFormProps,
  AboutProfessionalFormValues,
} from './about-professional-form.interface';

import styles from './about-professional-form.module.scss';

const defaultValues: AboutProfessionalFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  facebook: '',
  instagram: '',
  about: '',
  tiktok: '',
  nickname: '',
};

const THIRTY_TWO = 32;
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/;
const nicknameRegax = /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':",.<>?/]{1,32}$/;
const facebookUrlRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:mbasic\.facebook|m\.facebook|facebook|fb)\.(?:com|me)\/(?:profile\.php\?id=\d+|pages\/\d+\/[\w-]+|[\w-]+)?\/?$/i;
const instagramRegex =
  /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv|stories|[\w._-]+)(?:\/[a-zA-Z0-9_-]+)?\/?$/i;
const tiktokUrlRegex =
  /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/(?:@[\w.-]+|(?:v|embed|t)\/\d+)(?:\?.*)?$/i;

const validationSchema: z.Schema<AboutProfessionalFormValues> = z.object({
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
  email: z.string().min(1, 'validation.email.required'),
  facebook: z
    .string()
    .max(100)
    .optional()
    .refine(
      (value) => !value || facebookUrlRegex.test(value),
      'validation.facebook.invalid'
    ),
  instagram: z
    .string()
    .max(100)
    .optional()
    .refine(
      (value) => !value || instagramRegex.test(value),
      'validation.instagram.invalid'
    ),
  about: z.string(),
  tiktok: z
    .string()
    .max(100)
    .optional()
    .refine(
      (value) => !value || tiktokUrlRegex.test(value),
      'validation.tiktok.invalid'
    ),
  nickname: z
    .string()
    .min(2, 'validation.nickname.minLength')
    .max(THIRTY_TWO, 'validation.nickname.maxLength')
    .regex(nicknameRegax),
});

const validationSchemaCustomer: z.Schema<AboutProfessionalFormValues> =
  z.object({
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
        'validation.lastName.firstLetterCapitalized'
      ),
    phone: z
      .string()
      .min(1, 'validation.phone.required')
      .regex(phoneRegex, 'validation.phone.invalid'),
    email: z.string().min(1, 'validation.email.required'),
    nickname: z
      .string()
      .min(2, 'validation.nickname.minLength')
      .max(THIRTY_TWO, 'validation.nickname.maxLength')
      .regex(nicknameRegax),
  });

const AboutProfessionalForm = memo<AboutProfessionalFormProps>(
  ({ initialValues, formId, onSubmit }) => {
    const intl = useIntl();
    // queries
    const { data: me } = trpc.user.me.useQuery();

    // form
    const { reset, setError, clearErrors, ...form } =
      useForm<AboutProfessionalFormValues>({
        defaultValues,
        resolver:
          me?.userType === 'PROFESSIONAL'
            ? zodResolver(validationSchema)
            : zodResolver(validationSchemaCustomer),
      });
    // state
    const avatar = useImageInputState(initialValues?.avatar);

    useEffect(() => {
      reset({ ...defaultValues, ...initialValues });
    }, [initialValues, reset]);

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
          getPrismaErrorMessage(
            error,
            'nickname',
            PRISMA_ERRORS.UNIQUE_DUPLICATE
          )
        ) {
          setError('nickname', {
            message: intl.formatMessage({
              id: 'user.about.professional.form.nickname.dublicate',
            }),
          });
        }
      },
      [intl, setError]
    );

    const handleSubmit = useCallback(
      async (data: AboutProfessionalFormValues) => {
        onSubmit &&
          onSubmit(
            { ...data, avatar: avatar.file || avatar.preview },
            handleError
          );
      },
      [avatar.file, avatar.preview, onSubmit, handleError]
    );

    const getErrorMessage = (errorKey: string | undefined) => {
      if (errorKey) {
        return intl.formatMessage({ id: errorKey });
      }
    };

    return (
      <form
        id={formId}
        onSubmit={form.handleSubmit(handleSubmit)}
        className={styles.root}
      >
        <AvatarSelect
          className={styles.avatarSelect}
          value={avatar.preview}
          onChange={avatar.onChange}
          onRemove={avatar.onRemove}
        />
        <div className={styles.inputsRow}>
          <Controller
            control={form.control}
            name='nickname'
            render={({ field }) => {
              return (
                <NickNameField
                  label={intl.formatMessage({
                    id: 'user.about.professional.form.nickname',
                  })}
                  value={field.value}
                  onChange={field.onChange}
                  error={getErrorMessage(
                    form.formState.errors.nickname?.message
                  )}
                  setError={setError}
                  clearErrors={clearErrors}
                />
              );
            }}
          />
          <TextField
            {...form.register('email')}
            error={getErrorMessage(form.formState.errors.email?.message)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.email',
            })}
            disabled
          />
        </div>
        <div className={styles.inputsRow}>
          <TextField
            {...form.register('firstName')}
            error={getErrorMessage(form.formState.errors.firstName?.message)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.firstName',
            })}
          />
          <TextField
            {...form.register('lastName')}
            error={getErrorMessage(form.formState.errors.lastName?.message)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.lastName',
            })}
          />
        </div>
        <div className={styles.inputsRow}>
          <Controller
            control={form.control}
            name='phone'
            render={({ field }) => {
              return (
                <PhoneField
                  error={getErrorMessage(form.formState.errors.phone?.message)}
                  label={intl.formatMessage({
                    id: 'user.about.professional.form.phone',
                  })}
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
          {me?.userType === 'PROFESSIONAL' && (
            <TextField
              {...form.register('facebook')}
              error={form.formState.errors.facebook?.message}
              variant='input'
              label={intl.formatMessage({
                id: 'user.about.professional.form.facebook',
              })}
            />
          )}
        </div>

        {me?.userType === 'PROFESSIONAL' && (
          <div className={styles.inputsRow}>
            <TextField
              {...form.register('instagram')}
              error={form.formState.errors.instagram?.message}
              variant='input'
              label={intl.formatMessage({
                id: 'user.about.professional.form.instagram',
              })}
            />

            <TextField
              {...form.register('tiktok')}
              variant='input'
              label={intl.formatMessage({
                id: 'user.about.professional.form.tiktok',
              })}
              error={form.formState.errors.tiktok?.message}
            />
          </div>
        )}
        {me?.userType === 'PROFESSIONAL' && (
          <TextField
            {...form.register('about')}
            error={Boolean(form.formState.errors.about)}
            variant='textarea'
            label={intl.formatMessage({
              id: 'user.about.professional.form.about',
            })}
            style={{ height: 200, resize: 'none' }}
          />
        )}
      </form>
    );
  }
);

AboutProfessionalForm.displayName = 'AboutProfessionalForm';

export { AboutProfessionalForm };
