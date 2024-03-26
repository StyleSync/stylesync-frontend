import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';

import { BookingInfoCard } from './booking-info-card';

const meta: Meta<typeof BookingInfoCard> = {
  title: 'Booking/BookingInfoCard',
  component: BookingInfoCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BookingInfoCard>;

export const Base: Story = {
  args: {
    name: 'Tanusha’s Beauty',
    serviceName: ' evening makeup',
    date: new Date(faker.date.future().toString()),
  },
  render: (props) => {
    return (
      <div style={{ paddingBottom: '150px' }}>
        <BookingInfoCard {...props} />
      </div>
    );
  },
};
