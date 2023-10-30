// hooks
import { useQueryParams } from '@/modules/core/hooks/use-search-params';
// constants
import { myBookingsDefaultTab } from '@/modules/booking/containers/my-bookings-tabs/my-bookings-tabs';
// types
import type { MyBookingsTabKey } from '@/modules/booking/containers/my-bookings-tabs/my-bookings-tabs.interface';
import { useCallback } from 'react';

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
