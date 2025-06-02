'use client';
import { type FC, useCallback, useState } from 'react';

import { sendGTMEvent } from '@next/third-parties/google';
import type { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
  const { data: session } = useSession();

  const handleSave = useCallback(() => {
    userUpdateMutation.mutate(
      {
        userType,
      },
      {
        onSuccess: () => {
          sendGTMEvent({
            event: 'account_type_selected',
            user_id: session?.user.id,
            user_email: session?.user?.email,
            user_type: userType,
          });
          router.push('/app/onboard');
        },
      }
    );
  }, [router, userType, userUpdateMutation, session]);

  return (
    <div className={styles.root}>
      <AccountTypeSelect value={userType} onChange={setUserType} />
      <div className={styles.actions}>
        <Button
          text={intl.formatMessage({ id: 'button.save' })}
          onClick={handleSave}
          disabled={!userType}
          isLoading={userUpdateMutation.isPending}
        />
      </div>
    </div>
  );
};
