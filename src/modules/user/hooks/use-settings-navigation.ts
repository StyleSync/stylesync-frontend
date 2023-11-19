import { useCallback } from 'react';
// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';

const defaultTabKey = 'services';

export const useSettingsNavigation = () => {
  const { queryParams, setQueryParams } = useQueryParams<{
    active: string;
  }>();
  // memo
  const active = queryParams.active ?? defaultTabKey;

  const set = useCallback(
    (value: string) => {
      setQueryParams({ active: value });
    },
    [setQueryParams]
  );

  return {
    active,
    set,
  };
};
