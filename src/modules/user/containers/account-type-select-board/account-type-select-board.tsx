'use client';
import { type FC, useState } from 'react';
// containers
import { AccountTypeSelect } from '@/modules/auth/containers/account-type-select';
// components
import { Button } from '@/modules/core/components/button';
// types
import type { AccountType } from '@/modules/user/types/account.types';

import type { AccountTypeSelectBoardProps } from './account-type-select-board.interface';
import styles from './account-type-select-board.module.scss';

export const AccountTypeSelectBoard: FC<AccountTypeSelectBoardProps> = () => {
  const [accountType, setAccountType] = useState<AccountType | null>(null);

  return (
    <div className={styles.root}>
      <AccountTypeSelect value={accountType} onChange={setAccountType} />
      <Button className={styles.submit} variant='secondary' text='Select' />
    </div>
  );
};
