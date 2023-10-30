import type { IconName } from '@/modules/core/components/icon';

export type ProfileSettingsMenuItemKey =
  | 'about'
  | 'services'
  | 'schedule'
  | 'gallery'
  | 'location';

export type MenuItem = {
  id: ProfileSettingsMenuItemKey;
  title: string;
  icon: IconName;
};
