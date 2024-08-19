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

const validationSchema: z.Schema<AboutProfessionalFormValues> = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string(),
  email: z.string(),
  facebook: z.string(),
  instagram: z.string(),
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
            error={Boolean(form.formState.errors.firstName)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.firstName',
            })}
          />
          <TextField
            {...form.register('lastName')}
            error={Boolean(form.formState.errors.lastName)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.lastName',
            })}
          />
        </div>
        <div className={styles.inputsRow}>
          <TextField
            {...form.register('email')}
            error={Boolean(form.formState.errors.email)}
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
                  error={Boolean(form.formState.errors.phone)}
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
            error={Boolean(form.formState.errors.facebook)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.facebook',
            })}
          />
          <TextField
            {...form.register('instagram')}
            error={Boolean(form.formState.errors.instagram)}
            variant='input'
            label={intl.formatMessage({
              id: 'user.about.professional.form.instagram',
            })}
          />
        </div>
        <TextField
          {...form.register('about')}
          error={Boolean(form.formState.errors.about)}
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
