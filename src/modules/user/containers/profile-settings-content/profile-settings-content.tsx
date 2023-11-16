'use client';
import type { ReactElement, FC } from 'react';
// components
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
import { ProfessionalSettingsAbout } from '@/modules/user/containers/professional-settings-about';
// containers
import { ProfessionalScheduleForm } from '@/modules/schedule/containers/professional-schedule-form';
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// hooks
import { useSettingsNavigation } from '@/modules/user/hooks/use-settings-navigation';

import type { ProfileSettingsContentProps } from './profile-settings-content.interface';
import { ProfessionalSettingsServices } from '@/modules/user/containers/professional-settings-services';

const contentMap: Record<string, ReactElement> = {
  about: <ProfessionalSettingsAbout />,
  services: <ProfessionalSettingsServices />,
  schedule: <ProfessionalScheduleForm />,
  gallery: <ProfessionalGalleryForm />,
  location: <UserLocationSelectForm />,
};

export const ProfileSettingsContent: FC<ProfileSettingsContentProps> = () => {
  const { active } = useSettingsNavigation();

  return contentMap[active];
};
