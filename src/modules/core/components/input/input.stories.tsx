import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Core UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    error: false,
  },
  argTypes: {
    error: {
      control: 'boolean',
    },
    className: {
      control: false,
    },
    labelClassName: {
      control: false,
    },
    containerClassName: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Error: Story = {
  args: {
    error: true,
    defaultValue: 'Error',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Disabled',
  },
};
