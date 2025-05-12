'use client';
import React, { type FC, useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import type { UserCredentials } from '@/modules/auth/types/auth.types';
import type { SignUpUserData } from '@/modules/auth/types/sign-up.types';
import { Button } from '@/modules/core/components/button';
import { Divider } from '@/modules/core/components/divider';
import { GradientButton } from '@/modules/core/components/gradient-button';
import { TextField } from '@/modules/core/components/text-field';
import { Typography } from '@/modules/core/components/typogrpahy';
import scssVariables from '@/styles/variables.module.scss';

import styles from './sign-in-form.module.scss';

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
            rippleColor={styles.googleRippleColor}
            icon='google-logo'
            text={intl.formatMessage({ id: 'signIn.social.google' })}
            className={styles.google}
          />
          <GradientButton
            gradient={scssVariables.facebookGradient}
            rippleColor={styles.facebookRippleColor}
            icon='facebook-logo'
            text={intl.formatMessage({ id: 'signIn.social.facebook' })}
            className={styles.facebook}
          />
          <GradientButton
            gradient={scssVariables.instagramGradient}
            rippleColor={styles.instagramRippleColor}
            icon='instagram-logo'
            text={intl.formatMessage({ id: 'signIn.social.instagram' })}
            className={styles.instagram}
          />
        </div>
      </>
    </div>
  );
};
