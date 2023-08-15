import React, { type FC, useEffect } from 'react';
import { useBoolean } from 'usehooks-ts';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components';
// validation
import {
  uppercaseCharacterRegex,
  lowercaseCharacterRegex,
  digitRegex,
  passwordMinLength,
} from '@/modules/auth/validation/schemas/password-validation.schemas';

import type { PasswordStrengthBarProps } from './password-requirements.interface';
import styles from './password-requirements.module.scss';

const requirements = [
  {
    title: 'One uppercase character',
    test: (password: string) => uppercaseCharacterRegex.test(password),
  },
  {
    title: 'One lowercase character',
    test: (password: string) => lowercaseCharacterRegex.test(password),
  },
  {
    title: '8 characters minimum',
    test: (password: string) => password.length >= passwordMinLength,
  },
  {
    title: 'One digit',
    test: (password: string) => digitRegex.test(password),
  },
];

export const PasswordRequirements: FC<PasswordStrengthBarProps> = ({
  password,
  className,
  highlight,
  style,
}) => {
  const isRequirementsFit = useBoolean(true);

  useEffect(() => {
    isRequirementsFit.setValue(
      requirements.every((requirement) => requirement.test(password))
    );
  }, [password, isRequirementsFit.setValue]);

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
