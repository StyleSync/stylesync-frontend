import { type FC } from 'react';

import { useIntl } from 'react-intl';

import { OnboardLayout } from '@/modules/onboard/components/onboard-layout';
import type { ProOnboardStepProps } from '@/modules/onboard/containers/pro-onboard/pro-onboard.interface';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';

export const OnboardGallery: FC<ProOnboardStepProps> = ({
  next,
  back,
  active,
}) => {
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
      active={active}
    >
      <ProfessionalGalleryForm />
    </OnboardLayout>
  );
};
