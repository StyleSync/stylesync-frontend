import type { Meta, StoryObj } from '@storybook/react';

import { BookingsList } from './bookings-list';
import { faker } from '@faker-js/faker';

const meta: Meta<typeof BookingsList> = {
  title: 'Booking UI/BookingsList',
  component: BookingsList,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BookingsList>;

export const Base: Story = {
  args: {
    groups: [
      {
        id: faker.string.uuid(),
        title: 'Group 1 title',
        list: [
          {
            id: faker.string.uuid(),
            name: 'Event name',
            serviceName: 'service name',
            date: new Date().toISOString(),
          },
        ],
        cardsVariant: 'green',
      },
      {
        id: faker.string.uuid(),
        title: 'Group 2 title',
        list: [],
        cardsVariant: 'light',
      },
    ],
  },
};
