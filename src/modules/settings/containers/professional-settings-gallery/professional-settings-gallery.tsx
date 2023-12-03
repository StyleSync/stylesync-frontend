import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';

export const ProfessionalSettingsGallery: FC = () => {
  return (
    <ProfileSettingsTabContentLayout
      title='Gallery settings'
      icon='folder'
      actions={[
        {
          text: 'Save',
          disabled: true,
        },
      ]}
    >
      <ProfessionalGalleryForm />
    </ProfileSettingsTabContentLayout>
  );
};
