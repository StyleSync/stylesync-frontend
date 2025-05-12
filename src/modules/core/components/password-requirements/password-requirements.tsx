import React, { type FC, useEffect } from 'react';

import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { useBoolean } from 'usehooks-ts';

import {
  digitRegex,
  lowercaseCharacterRegex,
  passwordMinLength,
  uppercaseCharacterRegex,
} from '@/modules/auth/validation/schemas/password-validation.schemas';
import { Typography } from '@/modules/core/components/typogrpahy';

import type { PasswordStrengthBarProps } from './password-requirements.interface';

import styles from './password-requirements.module.scss';

export const PasswordRequirements: FC<PasswordStrengthBarProps> = ({
  password,
  className,
  highlight,
  style,
}) => {
  const intl = useIntl();
  // state
  const isRequirementsFit = useBoolean(true);
  // memo
  const requirements = [
    {
      title: intl.formatMessage({ id: 'validation.password.oneUppercaseChar' }),
      test: (p: string) => uppercaseCharacterRegex.test(p),
    },
    {
      title: intl.formatMessage({ id: 'validation.password.oneLowercaseChar' }),
      test: (p: string) => lowercaseCharacterRegex.test(p),
    },
    {
      title: intl.formatMessage(
        { id: 'validation.password.minLength' },
        { length: passwordMinLength }
      ),
      test: (p: string) => p.length >= passwordMinLength,
    },
    {
      title: intl.formatMessage({ id: 'validation.password.oneDigit' }),
      test: (p: string) => digitRegex.test(p),
    },
  ];

  useEffect(() => {
    isRequirementsFit.setValue(
      requirements.every((requirement) => requirement.test(password))
    );
  }, [password, isRequirementsFit.setValue, requirements]);

  return (
    <div
      className={clsx(
        styles.root,
        { [styles.root_passed]: isRequirementsFit.value },
        className
      )}
      style={style}
    >
      {requirements.map((requirement, i) => (
        <div
          key={i}
          className={clsx(styles.item, {
            [styles.item_done]: requirement.test(password),
            [styles.item_highlighted]: highlight && !requirement.test(password),
          })}
        >
          <Typography variant='small'>{requirement.title}</Typography>
        </div>
      ))}
    </div>
  );
};
