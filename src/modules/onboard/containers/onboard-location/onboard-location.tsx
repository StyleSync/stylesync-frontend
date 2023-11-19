import { type FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// components
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
// containers
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

export const OnboardLocation: FC<ProOnboardStepProps> = ({ back }) => {
  const router = useRouter();

  const handleSubmit = useCallback(() => {
    router.push('/app/profile');
  }, [router]);

  return (
    <OnboardLayout
      meta={{ title: 'Location', description: 'todo...' }}
      nextButtonProps={{
        onClick: handleSubmit,
        text: 'Done',
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <UserLocationSelectForm />
    </OnboardLayout>
  );
};
