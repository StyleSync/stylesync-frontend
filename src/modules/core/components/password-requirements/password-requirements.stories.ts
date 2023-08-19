import type { Meta, StoryObj } from '@storybook/react';
// components

import { PasswordRequirements } from './password-requirements';

const meta: Meta<typeof PasswordRequirements> = {
  title: 'Core UI/PasswordRequirements',
  component: PasswordRequirements,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PasswordRequirements>;

export const Base: Story = {
  args: {
    password: '',
    style: {
      maxWidth: 400,
    },
  },
};
