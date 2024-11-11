import type { Meta, StoryObj } from '@storybook/react';

import { BookingStatus } from './booking-status';

const meta: Meta<typeof BookingStatus> = {
  title: 'Booking UI/BookingStatus',
  component: BookingStatus,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BookingStatus>;

export const Base: Story = {
  args: {
    status: 'REJECTED',
  },
};
