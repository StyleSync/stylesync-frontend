import { type FC } from 'react';

import { type Role } from '@prisma/client';
import { useIntl } from 'react-intl';

import { AccountTypeCard } from '@/modules/auth/components/account-type-card';
import { RadioButton } from '@/modules/core/components/radio-button';
import type { AccountTypeDisplayData } from '@/modules/user/types/account.types';

import type { AccountTypeSelectProps } from './account-type-select.interface';

import styles from './account-type-select.module.scss';

export const AccountTypeSelect: FC<AccountTypeSelectProps> = ({
  value,
  onChange,
}) => {
  const intl = useIntl();
  // memo
  const accountTypeDisplayData: Record<Role, AccountTypeDisplayData> = {
    PROFESSIONAL: {
      emoji: 'sunglasses',
      title: intl.formatMessage({ id: 'signUp.accountType.proCard.title' }),
      description: intl.formatMessage({
        id: 'signUp.accountType.proCard.description',
      }),
    },
    CUSTOMER: {
      emoji: 'heart-eyes',
      title: intl.formatMessage({ id: 'signUp.accountType.clientCard.title' }),
      description: intl.formatMessage({
        id: 'signUp.accountType.clientCard.description',
      }),
    },
  };

  return (
    <div className={styles.root}>
      <RadioButton.Group
        name='account-type'
        value={value}
        onChange={(accountType) => onChange(accountType as Role)}
      >
        {Object.keys(accountTypeDisplayData).map((key) => (
          <AccountTypeCard
            key={key}
            value={key as Role}
            onClick={() => onChange(key as Role)}
            {...accountTypeDisplayData[key as Role]}
          />
        ))}
      </RadioButton.Group>
    </div>
  );
};
