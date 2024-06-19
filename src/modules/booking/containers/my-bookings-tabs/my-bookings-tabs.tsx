'use client';
import { type FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
// components
import { Tabs } from '@/modules/core/components/tabs';
// hooks
import { useMyBookingsTab } from '@/modules/booking/hooks/use-my-bookings-tab';
// types
import type { Tab } from '@/modules/core/components/tabs/tabs.interface';

import type {
  MyBookingsTabsProps,
  MyBookingsTabKey,
} from './my-bookings-tabs.interface';

export const myBookingsDefaultTab: MyBookingsTabKey = 'list';

export const MyBookingsTabs: FC<MyBookingsTabsProps> = () => {
  const intl = useIntl();

  const { activeTab, setActiveTab } = useMyBookingsTab();

  const tabs: Tab[] = [
    {
      key: 'list',
      name: intl.formatMessage({ id: 'booking.tabs.list' }),
      icon: 'list',
    },
    {
      key: 'calendar',
      name: intl.formatMessage({ id: 'booking.tabs.calendar' }),
      icon: 'calendar',
    },
  ];

  const handleTabChange = useCallback(
    (key: string) => {
      setActiveTab(key as MyBookingsTabKey);
    },
    [setActiveTab]
  );

  return <Tabs value={activeTab} onChange={handleTabChange} tabs={tabs} />;
};
