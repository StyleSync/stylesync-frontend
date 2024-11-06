import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
import { AlbumAddModal } from '@/modules/settings/components/album-add-modal';
import { Button } from '@/modules/core/components/button';
import { useBoolean } from 'usehooks-ts';

export const ProfessionalSettingsGallery: FC = () => {
  const isModalOpen = useBoolean();

  return (
    <ProfileSettingsTabContentLayout
      actions={[
        {
          actionNode: (
            <AlbumAddModal
              onOpenChange={isModalOpen.setValue}
              isOpen={isModalOpen.value}
              trigger={<Button text='Add album' />}
            />
          ),
          isMobile: true,
        },
      ]}
      title='gallery.settings.title'
      icon='folder'
    >
      <ProfessionalGalleryForm />
    </ProfileSettingsTabContentLayout>
  );
};
