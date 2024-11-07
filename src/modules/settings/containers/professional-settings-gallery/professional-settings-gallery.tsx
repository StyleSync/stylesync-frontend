import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';

export const ProfessionalSettingsGallery: FC = () => {
  return (
    <ProfileSettingsTabContentLayout
      title='gallery.settings.title'
      icon='folder'
    >
      <ProfessionalGalleryForm />
    </ProfileSettingsTabContentLayout>
  );
};
