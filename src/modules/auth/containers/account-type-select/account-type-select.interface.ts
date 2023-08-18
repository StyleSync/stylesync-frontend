import type { AccountType } from '@/modules/user/types/account.types';

export type AccountTypeSelectProps = {
  value: AccountType | null;
  onChange: (value: AccountType) => void;
};
