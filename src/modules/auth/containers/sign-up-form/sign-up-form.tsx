'use client';
import React, { type FC, useCallback, useId, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Transition } from 'react-transition-group';
// components
import {
  Button,
  Stepper,
  Typography,
  Divider,
} from '@/modules/core/components';
// containers
import { AccountTypeSelect } from '@/modules/auth/containers/account-type-select';
import { AccountCredentialsForm } from '@/modules/auth/containers/account-credentials-form';
// validation
import { signUpFormValidationSchema } from '@/modules/auth/validation/schemas/sign-up-validation.schemas';
// constants
import {
  signUpFormDefaultValues,
  SIGN_UP_STEPS,
} from '@/modules/auth/constants/sign-up.constants';
// types
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import type { AccountType } from '@/modules/user/types/account.types';
import type { SignUpUserData } from '@/modules/auth/types/sign-up.types';

import styles from './sign-up-form.module.scss';

export const SignUpForm: FC = () => {
  // form
  const form = useForm<SignUpUserData>({
    defaultValues: signUpFormDefaultValues,
    resolver: zodResolver(signUpFormValidationSchema),
  });
  // state
  const [step, setStep] = useState(SIGN_UP_STEPS[0].value);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  // ids
  const formId = useId();
  // memo
  const buttonProps = useMemo<ButtonProps>(() => {
    if (step === 'account-type') {
      return {
        text: 'Next',
        iconEnd: 'arrow-right',
        type: 'button',
        disabled: !accountType,
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          setStep('credentials');
        },
      };
    }

    if (step === 'credentials') {
      return {
        text: 'Sign up',
        type: 'submit',
        form: formId,
      };
    }

    return {};
  }, [formId, step, accountType]);

  const handleFormSubmit = useCallback(() => {}, []);

  const handleBackClick = useCallback(() => {
    setStep('account-type');
  }, []);

  return (
    <div className={styles.root}>
      <Typography variant='title' className={styles.title} As='h1'>
        Create Account
      </Typography>
      <Stepper
        value={step}
        steps={SIGN_UP_STEPS}
        classes={{
          root: styles.stepper,
        }}
      />
      <div className={styles.content}>
        <Transition timeout={200} in={step === 'account-type'} unmountOnExit>
          {(status) => (
            <div className={clsx(styles.item, styles[status])}>
              <AccountTypeSelect
                value={accountType}
                onChange={setAccountType}
              />
            </div>
          )}
        </Transition>
        <Transition timeout={200} in={step === 'credentials'} unmountOnExit>
          {(status) => (
            <div className={clsx(styles.item, styles[status])}>
              <AccountCredentialsForm
                form={form}
                formId={formId}
                onSubmit={handleFormSubmit}
              />
            </div>
          )}
        </Transition>
      </div>
      <div className={styles.actions}>
        <Transition timeout={300} in={step === 'credentials'} unmountOnExit>
          {(status) => (
            <Button
              icon='arrow-left'
              variant='secondary'
              className={clsx(styles.back, styles[status])}
              onClick={handleBackClick}
            />
          )}
        </Transition>
        <Button {...buttonProps} className={styles.submit} />
      </div>
      {step === 'credentials' && (
        <>
          <Divider variant='horizontal'>or</Divider>
          <div className={styles.social}>
            <div className={styles.socialButtonWrapper}>
              <Button icon='google-logo' variant='secondary' />
              <div className={styles.socialInfo}>
                <Typography variant='small'>Sign up with Google</Typography>
              </div>
            </div>
            <div className={styles.socialButtonWrapper}>
              <Button icon='instagram-logo' variant='secondary' />
              <div className={styles.socialInfo}>
                <Typography variant='small'>Sign up with Instagram</Typography>
              </div>
            </div>
            <div className={styles.socialButtonWrapper}>
              <Button icon='facebook-logo' variant='secondary' />
              <div className={styles.socialInfo}>
                <Typography variant='small'>Sign up with Facebook</Typography>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
