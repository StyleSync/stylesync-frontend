import { type FC } from 'react';
import { useBoolean } from 'usehooks-ts';
import { type UseFormReturn } from 'react-hook-form';
import { useIntl } from 'react-intl';
import Link from 'next/link';
// components
import { TextField } from '@/modules/core/components/text-field';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { PasswordRequirements } from '@/modules/core/components/password-requirements';

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
  const intl = useIntl();
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
        label={intl.formatMessage({ id: 'general.credentials.email' })}
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
          label={intl.formatMessage({ id: 'general.credentials.password' })}
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
      <Typography className={styles.terms} variant='small'>
        {intl.formatMessage({ id: 'signUp.userAgreement.description' })}
        <Link href='#' className='link'>
          {intl.formatMessage({ id: 'signUp.userAgreement.terms' })}
        </Link>
        {', '}
        <Link href='#' className='link'>
          {intl.formatMessage({ id: 'signUp.userAgreement.privacy' })}
        </Link>{' '}
        {intl.formatMessage({ id: 'general.conjunction.and' })}{' '}
        <Link href='#' className='link'>
          {intl.formatMessage({ id: 'signUp.userAgreement.cookies' })}
        </Link>
      </Typography>
    </form>
  );
};
