import type { ReactElement } from 'react';
import type { ProfileSettingsMenuItemKey } from '@/modules/user/containers/profile-settings-navigation/profile-settings.interface';
import type { ProfileSettingsTabContentLayoutProps } from '@/modules/user/components/profile-settings-tab-content-layout/profile-settings-tab-content-layout.interface';

export type ProfileSettingsContentMap = Record<
  ProfileSettingsMenuItemKey,
  {
    layoutProps: Omit<ProfileSettingsTabContentLayoutProps, 'children'>;
    content: ReactElement;
  }
>;

export type ProfileSettingsContentProps = {};
