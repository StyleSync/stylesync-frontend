import type { Meta, StoryObj } from '@storybook/react';

import { DialogBottom } from './dialog-bottom';

const meta: Meta<typeof DialogBottom> = {
  title: 'Core UI/DialogBottom',
  component: DialogBottom,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DialogBottom>;

export const Base: Story = {};
