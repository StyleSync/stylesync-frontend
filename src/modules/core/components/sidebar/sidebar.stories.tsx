import type { Meta, StoryObj } from '@storybook/react';

import { Sidebar } from './sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Core UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Base: Story = {
  args: {
    linkGroups: [],
  },
};
