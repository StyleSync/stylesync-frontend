import { type FC } from 'react';
import { useIntl } from 'react-intl';

// components
import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
// types
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';

export const OnboardGallery: FC<ProOnboardStepProps> = ({ next, back }) => {
  const intl = useIntl();

  return (
    <OnboardLayout
      meta={{
        title: intl.formatMessage({ id: 'onboard.gallery.title' }),
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
