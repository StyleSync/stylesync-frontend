'use client';
import { type FC } from 'react';
// components
import { Tabs } from '@/modules/core/components/tabs';

export const ProfessionalProfileTabs: FC = () => {
  return (
    <Tabs
      value='about'
      tabs={[
        {
          key: 'about',
          name: 'About',
        },
        {
          key: 'services',
          name: 'Services',
        },
        {
          key: 'gallery',
          name: 'Gallery',
        },
      ]}
    />
  );
};
