import type { Meta, StoryObj } from '@storybook/react';

import { AccountTypeCard } from './account-type-card';

const meta: Meta<typeof AccountTypeCard> = {
  title: 'Auth UI/AccountTypeCard',
  component: AccountTypeCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AccountTypeCard>;

export const Base: Story = {
  args: {
    title: 'Professional account',
    emoji: 'sunglasses',
    description:
      'Provide services, manage bookings, get analytics and essential tools for business',
  },
};
