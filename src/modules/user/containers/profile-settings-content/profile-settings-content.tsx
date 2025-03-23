'use client';
import type { FC, ReactElement } from 'react';

// components
import { DialogFullScreen } from '@/modules/core/components/dialog-full-screen';
import { useDeviceType } from '@/modules/core/hooks/use-device-type';
// utils
import { trpc } from '@/modules/core/utils/trpc.utils';
import { ProfessionalSettingsGallery } from '@/modules/settings/containers/professional-settings-gallery';
import { ProfessionalSettingsLocation } from '@/modules/settings/containers/professional-settings-location';
// containers
import { ProfessionalSettingsAbout } from '@/modules/user/containers/professional-settings-about';
import { ProfessionalSettingsSchedule } from '@/modules/user/containers/professional-settings-schedule';
import { ProfessionalSettingsServices } from '@/modules/user/containers/professional-settings-services';
// hooks
import { useSettingsNavigation } from '@/modules/user/hooks/use-settings-navigation';

import type { ProfileSettingsContentProps } from './profile-settings-content.interface';

const contentMap: Record<string, ReactElement> = {
  about: <ProfessionalSettingsAbout />,
  services: <ProfessionalSettingsServices />,
  schedule: <ProfessionalSettingsSchedule />,
  gallery: <ProfessionalSettingsGallery />,
  location: <ProfessionalSettingsLocation />,
};

export const ProfileSettingsContent: FC<ProfileSettingsContentProps> = () => {
  const { active, defaultTab, reset } = useSettingsNavigation();
  const deviceType = useDeviceType();
  // queries
  const { data: me } = trpc.user.me.useQuery();

  const initialTab = me?.userType === 'CUSTOMER' ? 'about' : defaultTab;
  const stepElement = contentMap[active ?? initialTab];

  if (deviceType === 'mobile') {
    return (
      <DialogFullScreen
        isOpen={!!active}
        onOpenChange={reset}
        applyMobileBottomTabPadding
      >
        {stepElement}
      </DialogFullScreen>
    );
  }

  return stepElement;
};
