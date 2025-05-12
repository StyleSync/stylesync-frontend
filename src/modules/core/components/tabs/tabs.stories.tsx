import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Core UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Base: Story = {
  render: () => {
    const [value, setValue] = useState('services');

    return (
      <Tabs
        value={value}
        onChange={setValue}
        tabs={[
          {
            key: 'about',
            name: 'About',
            icon: 'info',
          },
          {
            key: 'gallery',
            name: 'Gallery',
            icon: 'image',
          },
          {
            key: 'services',
            name: 'Services',
            icon: 'beauty-service',
          },
          {
            key: 'schedule',
            name: 'Schedule',
            icon: 'calendar',
          },
          {
            key: 'location',
            name: 'Location',
            icon: 'location',
          },
          {
            key: 'reviews',
            name: 'Reviews',
            icon: 'star',
          },
        ]}
      />
    );
  },
};
