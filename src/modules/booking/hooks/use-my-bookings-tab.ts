import { useCallback } from 'react';

import { myBookingsDefaultTab } from '@/modules/booking/containers/my-bookings-tabs/my-bookings-tabs';
import type { MyBookingsTabKey } from '@/modules/booking/containers/my-bookings-tabs/my-bookings-tabs.interface';
import { useQueryParams } from '@/modules/core/hooks/use-search-params';

type UseMyBookingsTabResult = {
  activeTab: MyBookingsTabKey;
  setActiveTab: (tab: MyBookingsTabKey) => void;
};

export const useMyBookingsTab = (): UseMyBookingsTabResult => {
  const { queryParams, setQueryParams } = useQueryParams<{
    tab: MyBookingsTabKey;
  }>();
  const activeTab = queryParams.tab ?? myBookingsDefaultTab;

  const setActiveTab = useCallback(
    (tab: MyBookingsTabKey) => {
      setQueryParams({ tab });
    },
    [setQueryParams]
  );

  return {
    activeTab,
    setActiveTab,
  };
};
