import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  title: 'Core UI/Divider',
  component: Divider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Base: Story = {
  args: {
    children: 'Hello world',
  },
};
