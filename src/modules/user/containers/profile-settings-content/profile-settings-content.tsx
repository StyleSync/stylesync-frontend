'use client';
import { type FC } from 'react';
// components
import { ProfileSettingsTabContentLayout } from '@/modules/user/components/profile-settings-tab-content-layout';
import { AboutProfessionalForm } from '@/modules/user/components/about-professional-form';
import { ProfessionalGalleryForm } from '@/modules/user/components/professional-gallery-form';
// containers
import { ProfessionalServicesForm } from '@/modules/service/containers/professional-services-form';
import { ProfessionalScheduleForm } from '@/modules/schedule/containers/professional-schedule-form';
import { UserLocationSelectForm } from '@/modules/location/containers/user-location-select-form';
// hooks
import { useProfileSettingsMenu } from '@/modules/user/hooks/use-profile-settings-menu';

import type {
  ProfileSettingsContentProps,
  ProfileSettingsContentMap,
} from './profile-settings-content.interface';

const contentMap: ProfileSettingsContentMap = {
  about: {
    layoutProps: {
      title: 'About settings',
      icon: 'info',
      actions: [
        {
          text: 'Save',
          disabled: true,
        },
      ],
    },
    content: <AboutProfessionalForm />,
  },
  services: {
    layoutProps: {
      title: 'Services settings',
      icon: 'info',
      actions: [
        {
          text: 'Save',
          disabled: true,
        },
      ],
    },
    content: <ProfessionalServicesForm />,
  },
  schedule: {
    layoutProps: {
      title: 'Schedule settings',
      icon: 'info',
      actions: [
        {
          text: 'Save',
          disabled: true,
        },
      ],
    },
    content: <ProfessionalScheduleForm />,
  },
  gallery: {
    layoutProps: {
      title: 'Gallery settings',
      icon: 'info',
      actions: [
        {
          text: 'Save',
          disabled: true,
        },
      ],
    },
    content: <ProfessionalGalleryForm />,
  },
  location: {
    layoutProps: {
      title: 'Location settings',
      icon: 'info',
      actions: [
        {
          text: 'Save',
          disabled: true,
        },
      ],
    },
    content: <UserLocationSelectForm />,
  },
};

export const ProfileSettingsContent: FC<ProfileSettingsContentProps> = () => {
  const { activeMenuItem } = useProfileSettingsMenu();
  const { layoutProps, content } = contentMap[activeMenuItem];

  return (
    <ProfileSettingsTabContentLayout {...layoutProps}>
      {content}
    </ProfileSettingsTabContentLayout>
  );
};
