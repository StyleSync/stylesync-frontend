'use client';
import { type FC, useCallback, useState } from 'react';

import type { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

import { AccountTypeSelect } from '@/modules/auth/components/account-type-select';
import { Button } from '@/modules/core/components/button';
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { ExistingAccountTypeSelectProps } from './existing-account-type-select.interface';

import styles from './existing-account-type-select.module.scss';

export const ExistingAccountTypeSelect: FC<
  ExistingAccountTypeSelectProps
> = () => {
  const intl = useIntl();
  const router = useRouter();
  // state
  const [userType, setUserType] = useState<Role | null>(null);
  // queries
  const userUpdateMutation = trpc.user.update.useMutation();

  const handleSave = useCallback(() => {
    userUpdateMutation.mutate(
      {
        userType,
      },
      {
        onSuccess: () => {
          router.push('/app/onboard');
        },
      }
    );
  }, [router, userType, userUpdateMutation]);

  return (
    <div className={styles.root}>
      <AccountTypeSelect value={userType} onChange={setUserType} />
      <div className={styles.actions}>
        <Button
          text={intl.formatMessage({ id: 'button.save' })}
          onClick={handleSave}
          disabled={!userType}
          isLoading={userUpdateMutation.isLoading}
        />
      </div>
    </div>
  );
};
