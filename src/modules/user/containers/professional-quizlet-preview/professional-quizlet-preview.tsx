'use client';
import { type FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// components
import { BrowserView } from '@/modules/core/components/browser-view';
import { Typography } from '@/modules/core/components/typogrpahy';
import { Spinner } from '@/modules/core/components/spinner';
import { Placeholder } from '@/modules/core/components/placeholder';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
// assets
import AboutProPreview from '@/assets/images/about-pro-preview.png';

import type { ProfessionalQuizletPreviewProps } from './professional-quizlet-preview.interface';
import styles from './professional-quizlet-preview.module.scss';
import { showToast } from '@/modules/core/providers/toast-provider';

export const ProfessionalQuizletPreview: FC<
  ProfessionalQuizletPreviewProps
> = () => {
  const router = useRouter();
  const session = useSession();
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

  const handleSkipClick = useCallback(async () => {
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
      <Typography className={styles.description}>
        We will use this information to create a detailed account of your
        experience that can be shared with your clients
      </Typography>
      <BrowserView className={styles.browser} image={AboutProPreview} />
      <div className={styles.skip}>
        <Placeholder isActive={isLoading} placeholder={<Spinner />}>
          <button className='link' onClick={handleSkipClick}>
            <Typography variant='body1'>Skip</Typography>
          </button>
        </Placeholder>
      </div>
    </div>
  );
};
