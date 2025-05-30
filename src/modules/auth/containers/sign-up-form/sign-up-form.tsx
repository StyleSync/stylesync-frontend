'use client';
import React, { type FC, useCallback, useId, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Role } from '@prisma/client';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Transition } from 'react-transition-group';

import { AccountTypeSelect } from '@/modules/auth/components/account-type-select';
import { AccountCredentialsForm } from '@/modules/auth/containers/account-credentials-form';
import type { SignUpUserData } from '@/modules/auth/types/sign-up.types';
import { signUpFormValidationSchema } from '@/modules/auth/validation/schemas/sign-up-validation.schemas';
import { Button } from '@/modules/core/components/button';
import type { ButtonProps } from '@/modules/core/components/button/button.interface';
import { Divider } from '@/modules/core/components/divider';
import { Stepper } from '@/modules/core/components/stepper';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { SignUpStep, SignUpStepValue } from './sign-up-form.interface';

import styles from './sign-up-form.module.scss';

export const defaultValues: SignUpUserData = {
  email: '',
  password: '',
};

export const SignUpForm: FC = () => {
  // form
  const intl = useIntl();
  const form = useForm<SignUpUserData>({
    defaultValues,
    resolver: zodResolver(signUpFormValidationSchema),
  });
  // state
  const [step, setStep] = useState<SignUpStepValue>('account-type');
  const [accountType, setAccountType] = useState<Role | null>(null);
  // ids
  const formId = useId();
  // memo
  const buttonProps = useMemo<ButtonProps>(() => {
    if (step === 'account-type') {
      return {
        text: intl.formatMessage({ id: 'general.actions.next' }),
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
  }, [step, intl, accountType, formId]);

  const signUpSteps = useMemo<SignUpStep[]>(
    () => [
      {
        value: 'account-type',
        text: intl.formatMessage({ id: 'signUp.accountType.title' }),
      },
      {
        value: 'credentials',
        text: intl.formatMessage({ id: 'signUp.credentials.title' }),
      },
    ],
    [intl]
  );

  const handleFormSubmit = useCallback(() => {}, []);

  const handleBackClick = useCallback(() => {
    setStep('account-type');
  }, []);

  return (
    <div className={styles.root}>
      <Typography variant='title' className={styles.title} As='h1'>
        {intl.formatMessage({ id: 'signUp.title' })}
      </Typography>
      <Stepper
        value={step}
        steps={signUpSteps}
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
          <Divider variant='horizontal'>
            {intl.formatMessage({ id: 'general.conjunction.or' })}
          </Divider>
          <div className={styles.social}>
            <div className={styles.socialButtonWrapper}>
              <Button icon='google-logo' variant='secondary' />
              <div className={styles.socialInfo}>
                <Typography variant='small'>
                  {intl.formatMessage({ id: 'signUp.social.google' })}
                </Typography>
              </div>
            </div>
            <div className={styles.socialButtonWrapper}>
              <Button icon='instagram-logo' variant='secondary' />
              <div className={styles.socialInfo}>
                <Typography variant='small'>
                  {intl.formatMessage({ id: 'signUp.social.instagram' })}
                </Typography>
              </div>
            </div>
            <div className={styles.socialButtonWrapper}>
              <Button icon='facebook-logo' variant='secondary' />
              <div className={styles.socialInfo}>
                <Typography variant='small'>
                  {intl.formatMessage({ id: 'signUp.social.facebook' })}
                </Typography>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
