import type { Meta, StoryObj } from '@storybook/react';

import { BookingsList } from './bookings-list';

const meta: Meta<typeof BookingsList> = {
  title: 'Booking UI/BookingsList',
  component: BookingsList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BookingsList>;

export const Base: Story = {};
