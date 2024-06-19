import { type FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';

// components
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
// containers
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

export const OnboardLocation: FC<ProOnboardStepProps> = ({ back }) => {
  const intl = useIntl();

  const router = useRouter();

  const handleSubmit = useCallback(() => {
    router.push('/app/profile');
  }, [router]);

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
