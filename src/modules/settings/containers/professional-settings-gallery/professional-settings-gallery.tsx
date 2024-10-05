import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
import { useIntl } from 'react-intl';

export const ProfessionalSettingsGallery: FC = () => {
  const intl = useIntl();

  return (
    <ProfileSettingsTabContentLayout
      title={intl.formatMessage({ id: 'professional.settings.gallery.title' })}
      icon='folder'
    >
      <ProfessionalGalleryForm />
    </ProfileSettingsTabContentLayout>
  );
};
