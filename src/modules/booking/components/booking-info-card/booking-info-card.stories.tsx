import type { Meta, StoryObj } from '@storybook/react';

import { BookingInfoCard } from './booking-info-card';
import { addHours } from 'date-fns';

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
    date: new Date(),
    startTime: new Date(),
    endTime: addHours(new Date(), 1),
  },
  render: (props) => {
    return (
      <div style={{ paddingBottom: '150px' }}>
        <BookingInfoCard {...props} />
      </div>
    );
  },
};
