import { memo, useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useIntl } from 'react-intl';
// components
import { TextField } from '@/modules/core/components/text-field';
import { AvatarSelect } from '@/modules/core/components/avatar-select';
import { PhoneField } from '@/modules/core/components/phone-field';

// hooks
import { useImageInputState } from '@/modules/core/hooks/use-image-input-state';
// type
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
};

const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+$/;

const facebookUrlRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:mbasic\.facebook|m\.facebook|facebook|fb)\.(?:com|me)\/(?:profile\.php\?id=\d+|pages\/\d+\/[\w-]+|[\w-]+)?\/?$/i;

const instagramRegex =
  /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv|stories|[\w._-]+)(?:\/[a-zA-Z0-9_-]+)?\/?$/i;

const THIRTY_TWO = 32;

const validationSchema: z.Schema<AboutProfessionalFormValues> = z.object({
  firstName: z
    .string()
    .min(2, 'validation.firstName.minLength')
    .max(THIRTY_TWO, 'validation.firstName.maxLength')
    .regex(nameRegex, 'validation.firstName.invalidCharacters')
    .refine(
      (value) => /^[A-ZА-Я]/.test(value),
      'validation.firstName.firstLetterCapitalized'
    ),
  lastName: z
    .string()
    .min(2, 'validation.lastName.minLength')
    .max(THIRTY_TWO, 'validation.lastName.maxLength')
    .regex(nameRegex, 'validation.lastName.invalidCharacters')
    .refine(
      (value) => /^[A-ZА-Я]/.test(value),
      'validation.lastName.firstLetterCapitalized'
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
});

const AboutProfessionalForm = memo<AboutProfessionalFormProps>(
  ({ initialValues, formId, onSubmit }) => {
    const intl = useIntl();
    // form
    const { reset, ...form } = useForm<AboutProfessionalFormValues>({
      defaultValues,
      resolver: zodResolver(validationSchema),
    });
    // state
    const avatar = useImageInputState(initialValues?.avatar);

    useEffect(() => {
      reset({ ...defaultValues, ...initialValues });
    }, [initialValues, reset]);

    const handleSubmit = useCallback(
      async (data: AboutProfessionalFormValues) => {
        onSubmit &&
          onSubmit({ ...data, avatar: avatar.file || avatar.preview });
      },
      [avatar.file, avatar.preview, onSubmit]
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
          <TextField
            {...form.register('email')}
            error={getErrorMessage(form.formState.errors.email?.message)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.email',
            })}
            disabled
          />
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
        </div>
        <div className={styles.inputsRow}>
          <TextField
            {...form.register('facebook')}
            error={getErrorMessage(form.formState.errors.facebook?.message)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.facebook',
            })}
          />
          <TextField
            {...form.register('instagram')}
            error={getErrorMessage(form.formState.errors.instagram?.message)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.instagram',
            })}
          />
        </div>
        <TextField
          {...form.register('about')}
          error={getErrorMessage(form.formState.errors.about?.message)}
          variant='textarea'
          label={intl.formatMessage({
            id: 'user.about.professional.form.about',
          })}
          style={{ height: 200, resize: 'none' }}
        />
      </form>
    );
  }
);

AboutProfessionalForm.displayName = 'AboutProfessionalForm';

export { AboutProfessionalForm };
