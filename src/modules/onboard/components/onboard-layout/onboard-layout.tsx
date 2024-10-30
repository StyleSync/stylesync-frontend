import { type FC, Fragment, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// hooks
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { showToast } from '@/modules/core/providers/toast-provider';
// components
import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
// containers
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';

import type { OnboardLayoutProps } from './onboard-layout.interface';
import styles from './onboard-layout.module.scss';

export const OnboardLayout: FC<OnboardLayoutProps> = ({
  children,
  meta,
  prevButtonProps,
  nextButtonProps,
}) => {
  const intl = useIntl();
  const deviceType = useDeviceType();
  const session = useSession();
  const router = useRouter();

  const ActionsContainer =
    deviceType === 'mobile' ? BottomFixedContent.Item : Fragment;

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
          router.replace(`/app/profile/${me.id}`);
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
    <div className={styles.root}>
      {meta && (
        <div className={styles.mobileInfo}>
          <Typography className='!text-dark' variant='body1'>
            {meta.title}
          </Typography>
          {deviceType === 'mobile' && (
            <Button
              className='absolute right-[23px] top-[69px] z-20 !h-8 !text-primary'
              text={intl.formatMessage({ id: 'button.skip' })}
              variant='text'
              disabled={isLoading || meQuery.isError}
              onClick={skip}
              isLoading={isLoading}
            />
          )}
        </div>
      )}
      {children}
      <ActionsContainer orderIndex={1}>
        <div className={styles.actions}>
          {prevButtonProps && (
            <Button
              className={styles.action}
              text={intl.formatMessage({ id: 'button.back' })}
              variant='secondary'
              {...prevButtonProps}
            />
          )}
          <Button
            className={styles.action}
            text={intl.formatMessage({ id: 'button.next' })}
            {...nextButtonProps}
          />
        </div>
      </ActionsContainer>
    </div>
  );
};
