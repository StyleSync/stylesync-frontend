import { type FC } from 'react';
// components
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

export const OnboardGallery: FC<ProOnboardStepProps> = ({ next, back }) => {
  return (
    <OnboardLayout
      meta={{
        title: 'Gallery',
        description: 'todo...',
      }}
      nextButtonProps={{
        onClick: next,
      }}
      prevButtonProps={{
        onClick: back,
      }}
    >
      <ProfessionalGalleryForm />
    </OnboardLayout>
  );
};
