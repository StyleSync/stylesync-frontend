'use client';
import type { ReactElement, FC } from 'react';
// components
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
import { ProfessionalSettingsAbout } from '@/modules/user/containers/professional-settings-about';
// containers
import { ProfessionalScheduleForm } from '@/modules/schedule/containers/professional-schedule-form';
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// hooks
import { useProfileSettingsMenu } from '@/modules/user/hooks/use-profile-settings-menu';

import type { ProfileSettingsContentProps } from './profile-settings-content.interface';
import type { ProfileSettingsMenuItemKey } from '@/modules/user/containers/profile-settings-navigation/profile-settings.interface';
import { ProfessionalSettingsServices } from '@/modules/user/containers/professional-settings-services';

const contentMap: Record<ProfileSettingsMenuItemKey, ReactElement> = {
  about: <ProfessionalSettingsAbout />,
  services: <ProfessionalSettingsServices />,
  schedule: <ProfessionalScheduleForm />,
  gallery: <ProfessionalGalleryForm />,
  location: <UserLocationSelectForm />,
};

export const ProfileSettingsContent: FC<ProfileSettingsContentProps> = () => {
  const { activeMenuItem } = useProfileSettingsMenu();
  const view = contentMap[activeMenuItem];

  return <>{view}</>;
};
