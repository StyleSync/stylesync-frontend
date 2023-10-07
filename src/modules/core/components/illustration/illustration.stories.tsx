import type { Meta, StoryObj } from '@storybook/react';

import { Illustration } from './illustration';

const meta: Meta<typeof Illustration> = {
  title: 'Core UI/Illustration',
  component: Illustration,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const Base: Story = {
  args: {
    name: 'folder',
  },
};
