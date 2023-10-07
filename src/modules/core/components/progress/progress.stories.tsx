import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Core UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Base: Story = {
  args: {
    progress: 10,
  },
};
