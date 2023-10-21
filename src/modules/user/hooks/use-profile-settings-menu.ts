import { useCallback } from 'react';
// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';
// constants
import { profileSettingMenuDefaultItemKey } from '@/modules/user/containers/profile-settings-navigation/profile-settings-navigation';
// types
import type { ProfileSettingsMenuItemKey } from '@/modules/user/containers/profile-settings-navigation/profile-settings.interface';

type UseProfileSettingsMenuResult = {
  activeMenuItem: ProfileSettingsMenuItemKey;
  setActiveMenuItem: (value: ProfileSettingsMenuItemKey) => void;
};

export const useProfileSettingsMenu = (): UseProfileSettingsMenuResult => {
  const { queryParams, setQueryParams } = useQueryParams<{
    step: ProfileSettingsMenuItemKey;
  }>();
  // memo
  const activeMenuItem = queryParams.step ?? profileSettingMenuDefaultItemKey;

  const setActiveMenuItem = useCallback(
    (value: ProfileSettingsMenuItemKey) => {
      setQueryParams({ step: value });
    },
    [setQueryParams]
  );

  return {
    activeMenuItem,
    setActiveMenuItem,
  };
};
