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

const ACCOUNT_TYPE_DISPLAY_DATA: Record<AccountType, AccountTypeDisplayData> = {
  professional: {
    title: 'Professional account',
    emoji: 'sunglasses',
    description:
      'Provide services, manage bookings, get analytics and essential tools for business',
  },
  client: {
    title: 'Client account',
    emoji: 'heart-eyes',
    description:
      'Choose and book services, find Pro’s, and make payments with security and comfort',
    badge: 'Soon',
    disabled: true,
  },
};

export const AccountTypeSelect: FC<AccountTypeSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className={styles.root}>
      <RadioButton.Group
        name='account-type'
        value={value}
        onChange={(accountType) => onChange(accountType as AccountType)}
      >
        {Object.keys(ACCOUNT_TYPE_DISPLAY_DATA).map((key) => (
          <AccountTypeCard
            key={key}
            value={key as AccountType}
            onClick={() => onChange(key as AccountType)}
            {...ACCOUNT_TYPE_DISPLAY_DATA[key as AccountType]}
          />
        ))}
      </RadioButton.Group>
    </div>
  );
};
