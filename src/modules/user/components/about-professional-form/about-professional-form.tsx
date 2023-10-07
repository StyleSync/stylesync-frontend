import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// components
import {
  TextField,
  ImageSelector,
  Typography,
  AvatarSelectMobile,
} from '@/modules/core/components';
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
  ({ formId, onSubmit }) => {
    // form
    const form = useForm<AboutProfessionalFormValues>({
      defaultValues,
      resolver: zodResolver(validationSchema),
    });
    // state
    const avatar = useImageInputState();

    const handleSubmit = useCallback(
      async (data: AboutProfessionalFormValues) => {
        onSubmit && onSubmit({ ...data, avatar: avatar.file });
      },
      [avatar.file, onSubmit]
    );

    return (
      <form
        id={formId}
        onSubmit={form.handleSubmit(handleSubmit)}
        className={styles.root}
      >
        <AvatarSelectMobile
          className={styles.avatarSelectMobile}
          value={avatar.preview}
          onChange={avatar.onChange}
        />
        <ImageSelector
          label='Avatar'
          classes={{
            container: styles.avatarSelect,
          }}
        >
          <Typography variant='body2'>
            <span className={styles.avatarSelectText}>Press here</span> to
            select an avatar image or drag and drop
          </Typography>
        </ImageSelector>
        <div className={styles.inputsRow}>
          <TextField
            {...form.register('firstName')}
            error={Boolean(form.formState.errors.firstName)}
            variant='input'
            label='First Name *'
            autoFocus
          />
          <TextField
            {...form.register('lastName')}
            error={Boolean(form.formState.errors.lastName)}
            variant='input'
            label='Last Name *'
          />
        </div>
        <div className={styles.inputsRow}>
          <TextField
            {...form.register('phone')}
            error={Boolean(form.formState.errors.phone)}
            variant='input'
            label='Phone'
          />
          <TextField
            {...form.register('email')}
            error={Boolean(form.formState.errors.email)}
            variant='input'
            label='Email'
          />
        </div>
        <div className={styles.inputsRow}>
          <TextField
            {...form.register('facebook')}
            error={Boolean(form.formState.errors.facebook)}
            variant='input'
            label='Facebook'
          />
          <TextField
            {...form.register('instagram')}
            error={Boolean(form.formState.errors.instagram)}
            variant='input'
            label='Instagram'
          />
        </div>
        <TextField
          {...form.register('about')}
          error={Boolean(form.formState.errors.about)}
          variant='textarea'
          label='About you'
          style={{ height: 200, resize: 'none' }}
        />
      </form>
    );
  }
);

AboutProfessionalForm.displayName = 'AboutProfessionalForm';

export { AboutProfessionalForm };
