'use client';
import React, { type FC, useCallback } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import { z } from 'zod';
// components
import {
  Button,
  Typography,
  Divider,
  TextField,
} from '@/modules/core/components';
import { GradientButton } from '@/modules/core/components/gradient-button';
// types
import type { SignUpUserData } from '@/modules/auth/types/sign-up.types';
import type { UserCredentials } from '@/modules/auth/types/auth.types';

import styles from './sign-in-form.module.scss';

import scssVariables from '@/styles/variables.module.scss';

const defaultValues: UserCredentials = {
  email: '',
  password: '',
};

const signInFormValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const SignInForm: FC = () => {
  // form
  const intl = useIntl();
  const form = useForm<SignUpUserData>({
    defaultValues,
    resolver: zodResolver(signInFormValidationSchema),
  });

  const handleSubmit = useCallback(() => {}, []);

  return (
    <div className={styles.root}>
      <Typography variant='title' className={styles.title} As='h1'>
        {intl.formatMessage({ id: 'signIn.title' })}
      </Typography>
      <form
        className={styles.content}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <TextField
          {...form.register('email')}
          label={intl.formatMessage({ id: 'general.credentials.email' })}
          error={Boolean(form.formState.errors.email)}
          variant='input'
          autoFocus
        />
        <TextField
          {...form.register('password')}
          label={intl.formatMessage({ id: 'general.credentials.password' })}
          error={Boolean(form.formState.errors.password)}
          variant='input'
          type='password'
        />
        <Button
          className={styles.submit}
          text={intl.formatMessage({ id: 'general.actions.signIn' })}
        />
      </form>
      <Typography className={styles.forgotPassword}>
        <Link href='#' className={clsx('link')}>
          {intl.formatMessage({ id: 'general.actions.forgotPassword' })}
        </Link>
      </Typography>
      <>
        <Divider variant='horizontal'>
          {intl.formatMessage({ id: 'general.conjunction.or' })}
        </Divider>
        <div className={styles.social}>
          <GradientButton
            gradient={scssVariables.accentColor}
            icon='google-logo'
            text={intl.formatMessage({ id: 'signIn.social.google' })}
            className={styles.google}
          />
          <GradientButton
            gradient={scssVariables.facebookGradient}
            icon='facebook-logo'
            text={intl.formatMessage({ id: 'signIn.social.facebook' })}
            className={styles.facebook}
          />
          <GradientButton
            gradient={scssVariables.instagramGradient}
            icon='instagram-logo'
            text={intl.formatMessage({ id: 'signIn.social.instagram' })}
            className={styles.instagram}
          />
        </div>
      </>
    </div>
  );
};
