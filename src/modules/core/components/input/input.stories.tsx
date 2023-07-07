import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Core UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Label',
  },
};
export const Error: Story = {
  args: {
    label: 'Label',
    error: true,
    value: 'Error',
    onChange: () => {},
  },
};
