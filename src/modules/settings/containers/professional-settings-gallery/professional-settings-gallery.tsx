import { type FC } from 'react';

import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';

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
