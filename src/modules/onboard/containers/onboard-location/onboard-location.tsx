import { type FC, useCallback } from 'react';

import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

import { trpc } from '@/modules/core/utils/trpc.utils';
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

export const OnboardLocation: FC<ProOnboardStepProps> = ({ back }) => {
  const intl = useIntl();
  const { data: userData } = trpc.user.me.useQuery();
  const { mutateAsync: updateUser } = trpc.user.update.useMutation();
  const { data: me } = trpc.user.me.useQuery();

  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    await updateUser({ onboardingCompleted: true });
    router.push(`/app/profile/${me?.nickname || userData?.id}`);
  }, [router, updateUser, userData?.id, me?.nickname]);

  return (
    <OnboardLayout
      meta={{ title: 'Location' }}
      nextButtonProps={{
        onClick: handleSubmit,
        text: intl.formatMessage({ id: 'button.done' }),
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <UserLocationSelectForm />
    </OnboardLayout>
  );
};
