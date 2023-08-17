import { type FC } from 'react';
// components
import { AccountTypeCard } from '@/modules/auth/components';
import { RadioButton } from '@/modules/core/components';
// types
import type {
  AccountType,
  AccountTypeDisplayData,
} from '@/modules/user/types/account.types';

import type { AccountTypeSelectProps } from './account-type-select.interface';
import styles from './account-type-select.module.scss';
import { useIntl } from 'react-intl';

export const AccountTypeSelect: FC<AccountTypeSelectProps> = ({
  value,
  onChange,
}) => {
  const intl = useIntl();
  // memo
  const accountTypeDisplayData: Record<AccountType, AccountTypeDisplayData> = {
    professional: {
      emoji: 'sunglasses',
      title: intl.formatMessage({ id: 'signUp.accountType.proCard.title' }),
      description: intl.formatMessage({
        id: 'signUp.accountType.proCard.description',
      }),
    },
    client: {
      emoji: 'heart-eyes',
      title: intl.formatMessage({ id: 'signUp.accountType.clientCard.title' }),
      description: intl.formatMessage({
        id: 'signUp.accountType.clientCard.description',
      }),
      badge: intl.formatMessage({ id: 'signUp.accountType.clientCard.badge' }),
      disabled: true,
    },
  };

  return (
    <div className={styles.root}>
      <RadioButton.Group
        name='account-type'
        value={value}
        onChange={(accountType) => onChange(accountType as AccountType)}
      >
        {Object.keys(accountTypeDisplayData).map((key) => (
          <AccountTypeCard
            key={key}
            value={key as AccountType}
            onClick={() => onChange(key as AccountType)}
            {...accountTypeDisplayData[key as AccountType]}
          />
        ))}
      </RadioButton.Group>
    </div>
  );
};
