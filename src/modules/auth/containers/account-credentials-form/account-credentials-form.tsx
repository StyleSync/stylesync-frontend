import { type FC } from 'react';
import { useBoolean } from 'usehooks-ts';
import { type UseFormReturn, Controller } from 'react-hook-form';
// components
import {
  Link,
  TextField,
  Typography,
  Checkbox,
  Button,
  PasswordRequirements,
} from '@/modules/core/components';

import styles from './account-credentials-form.module.scss';
import type { SignUpUserData } from '@/modules/auth/types/sign-up.types';

type AccountCredentialsFormProps = {
  form: UseFormReturn<SignUpUserData>;
  formId: string;
  onSubmit: (data: SignUpUserData) => void;
};

export const AccountCredentialsForm: FC<AccountCredentialsFormProps> = ({
  form,
  formId,
  onSubmit,
}) => {
  // state
  const isPasswordVisible = useBoolean();
  // refs
  const password = form.watch('password');

  return (
    <form
      className={styles.root}
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <TextField
        {...form.register('email')}
        error={Boolean(form.formState.errors.email)}
        variant='input'
        label='Email'
        autoComplete='email'
        spellCheck='false'
        aria-label='email'
        autoFocus
      />
      <div className={styles.passwordContainer}>
        <TextField
          {...form.register('password')}
          error={Boolean(form.formState.errors.password)}
          variant='input'
          label='Password'
          aria-label='password'
          type={isPasswordVisible.value ? 'text' : 'password'}
          endAdornment={
            <Button
              className={styles.eyeButton}
              icon={isPasswordVisible.value ? 'eye' : 'eye-no'}
              onClick={isPasswordVisible.toggle}
              variant='unstyled'
              type='button'
            />
          }
        />
        <PasswordRequirements
          password={password}
          highlight={Boolean(form.formState.errors.password)}
        />
      </div>
      <div className={styles.terms}>
        <Controller
          control={form.control}
          render={({ fieldState, field }) => (
            <Checkbox
              value={field.value}
              onChange={field.onChange}
              classes={{ checkmark: styles.checkmark }}
              error={Boolean(fieldState.error)}
            />
          )}
          name='isTermsAgreed'
        />
        <Typography>
          I have read and agree to the <Link href='#'>Terms of Service</Link>
        </Typography>
      </div>
    </form>
  );
};
