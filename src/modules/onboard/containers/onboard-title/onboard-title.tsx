'use client';
import { type FC, useCallback } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Stepper } from '@/modules/core/components/stepper';
import { Typography } from '@/modules/core/components/typogrpahy';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';
import { useOnboard } from '@/modules/onboard/hooks/use-onboard';

import styles from './onboard-title.module.scss';

export const OnboardTitle: FC = () => {
  const intl = useIntl();
  const router = useRouter();
  const session = useSession();
  const { active, onboardData } = useOnboard();
  // queries
  const { data: me, ...meQuery } = trpc.user.me.useQuery({
    expand: ['professional'],
  });
  const { mutate: meUpdate, ...meUpdateMutation } =
    trpc.user.update.useMutation();
  const {
    mutateAsync: professionalCreateAsync,
    ...professionalCreateMutation
  } = trpc.professional.create.useMutation();

  const accountData = trpc.user.me.useQuery();

  //
  const isLoading =
    meQuery.isLoading ||
    meUpdateMutation.isLoading ||
    professionalCreateMutation.isLoading;

  const skip = useCallback(async () => {
    if (!me) {
      return;
    }

    if (!me.professional) {
      await professionalCreateAsync({});
    }

    meUpdate(
      {
        onboardingCompleted: true,
      },
      {
        onSuccess: () => {
          session.update();
          router.replace(`/app/profile/${me?.nickname || me?.id}`);
        },
        onError: () => {
          showToast({
            variant: 'error',
            title: intl.formatMessage({ id: 'onboard.title.toast.title' }),
            description: intl.formatMessage({
              id: 'onboard.title.toast.description',
            }),
          });
        },
      }
    );
  }, [router, session, me, meUpdate, professionalCreateAsync, intl]);

  return (
    <>
      {accountData?.data?.userType === 'PROFESSIONAL' && (
        <div className={styles.root}>
          <div className={clsx('pageContent', styles.info)}>
            <Typography variant='subtitle' weight='medium'>
              {intl.formatMessage({ id: 'onboard.title.title' })}
            </Typography>
            <Button
              className={styles.skip}
              text={intl.formatMessage({ id: 'button.skip' })}
              variant='outlined'
              disabled={isLoading || meQuery.isError}
              onClick={skip}
            />
          </div>
          <div className='pageContent'>
            <Stepper
              value={active}
              steps={Object.values(onboardData).map((data) => ({
                value: data.value,
                text: data.title,
              }))}
              classes={{
                root: styles.stepper,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
