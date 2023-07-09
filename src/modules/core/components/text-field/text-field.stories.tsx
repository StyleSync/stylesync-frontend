import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './text-field';

const meta: Meta<typeof TextField> = {
  title: 'Core UI/TextField',
  component: TextField,
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
type Story = StoryObj<typeof TextField>;

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

export const Textarea: Story = {
  args: {
    variant: 'textarea',
    rows: 5,
  },
};
