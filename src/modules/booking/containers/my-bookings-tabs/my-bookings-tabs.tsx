'use client';
import { type FC, useCallback } from 'react';
// components
import { Tabs } from '@/modules/core/components/tabs';
// types
import type { Tab } from '@/modules/core/components/tabs/tabs.interface';

import type {
  MyBookingsTabsProps,
  MyBookingsTabKey,
} from './my-bookings-tabs.interface';
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';

const tabs: Tab[] = [
  {
    key: 'list',
    name: 'List',
    icon: 'list',
  },
  {
    key: 'calendar',
    name: 'Calendar',
    icon: 'calendar',
  },
];

export const myBookingsDefaultTab: MyBookingsTabKey = 'list';

export const MyBookingsTabs: FC<MyBookingsTabsProps> = () => {
  const { activeTab, setActiveTab } = useMyBookingsTab();

  const handleTabChange = useCallback(
    (key: string) => {
      setActiveTab(key as MyBookingsTabKey);
    },
    [setActiveTab]
  );

  return <Tabs value={activeTab} onChange={handleTabChange} tabs={tabs} />;
};
