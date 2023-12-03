import { useCallback } from 'react';
// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';

const defaultTabKey = 'services';

export const useSettingsNavigation = () => {
  const { queryParams, setQueryParams, clearQueryParams } = useQueryParams<{
    active?: string;
  }>();
  // memo
  const active = queryParams.active;

  const set = useCallback(
    (value: string) => {
      setQueryParams({ active: value });
    },
    [setQueryParams]
  );

  const reset = useCallback(() => {
    clearQueryParams(['active']);
  }, [clearQueryParams]);

  return {
    active,
    set,
    reset,
    defaultTab: defaultTabKey,
  };
};
