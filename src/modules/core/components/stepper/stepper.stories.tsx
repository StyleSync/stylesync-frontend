import type { Meta, StoryObj } from '@storybook/react';

import { Stepper } from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Core UI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    value: {
      defaultValue: 'service',
      type: {
        name: 'enum',
        value: ['service', 'datetime', 'confirmation'],
      },
    },
  },
  args: {
    value: 'service',
    steps: [
      {
        value: 'service',
        text: 'Service',
      },
      {
        value: 'datetime',
        text: 'Date & Time',
      },
      {
        value: 'confirmation',
        text: 'Confirmation',
      },
    ],
    vertical: false,
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Horizontal: Story = {
  render: ({ value, steps, ...props }) => (
    <div style={{ maxWidth: 500 }}>
      <Stepper value={value} steps={steps} {...props} />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  render: ({ value, steps, ...props }) => {
    return (
      <div style={{ display: 'flex', minHeight: 500 }}>
        <Stepper value={value} steps={steps} {...props} />
      </div>
    );
  },
};
