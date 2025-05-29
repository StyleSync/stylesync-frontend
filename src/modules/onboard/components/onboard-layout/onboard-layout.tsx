import { type FC, type ReactNode, useCallback } from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useIntl } from 'react-intl';

import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';
import { BottomFixedContent } from '@/modules/core/containers/bottom-fixed-content';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
import { showToast } from '@/modules/core/providers/toast-provider';
import { trpc } from '@/modules/core/utils/trpc.utils';

import type { OnboardLayoutProps } from './onboard-layout.interface';

import styles from './onboard-layout.module.scss';

const ChildrenContainer = ({ children }: { children: ReactNode }) => {
  return children;
};

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
    deviceType === 'mobile' ? BottomFixedContent.Item : ChildrenContainer;

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
    meQuery.isPending ||
    meUpdateMutation.isPending ||
    professionalCreateMutation.isPending;

  const skip = useCallback(async () => {
    if (!me) {
      return;
    }

    if (!me.professional && me.userType === 'PROFESSIONAL') {
      await professionalCreateAsync({});
    }

    meUpdate(
      {
        onboardingCompleted: true,
      },
      {
        onSuccess: () => {
          session.update();
          if (me.userType === 'PROFESSIONAL') {
            router.replace(`/app/profile/${me?.nickname || me.id}`);

            return;
          }

          router.replace(`/app/my-bookings`);
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
          {deviceType === 'mobile' && me?.userType === 'PROFESSIONAL' && (
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
