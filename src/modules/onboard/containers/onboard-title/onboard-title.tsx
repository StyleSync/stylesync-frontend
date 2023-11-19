'use client';
import { type FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { Button } from '@/modules/core/components/button';
import { Stepper } from '@/modules/core/components/stepper';
import { Header } from '@/modules/core/components/header';
import { Progress } from '@/modules/core/components/progress';
// hooks
import { useOnboard } from '@/modules/onboard/hooks/use-onboard';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';

import styles from './onboard-title.module.scss';

export const OnboardTitle: FC = () => {
  const router = useRouter();
  const session = useSession();
  const { active, onboardData, progress } = useOnboard();
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
          router.replace('/app/profile');
        },
        onError: () => {
          showToast({
            variant: 'error',
            title: 'Ooops, something went wrong...',
            description: 'Check your internet connection or try again later :)',
          });
        },
      }
    );
  }, [router, session, me, meUpdate, professionalCreateAsync]);

  return (
    <div className={styles.root}>
      <div className={clsx('pageContent', styles.info)}>
        <Typography variant='subtitle' weight='medium'>
          Onboarding
        </Typography>
        <Button
          className={styles.skip}
          text='Skip'
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
      <Header.BottomContent>
        <div className={styles.mobileProgress}>
          <Progress progress={progress} />
        </div>
      </Header.BottomContent>
    </div>
  );
};
