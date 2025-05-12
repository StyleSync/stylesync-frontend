import type { Meta, StoryObj } from '@storybook/react';
import { addHours } from 'date-fns';

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
    // @ts-ignore
    booking: {
      id: '1',
      startTime: new Date(),
      endTime: addHours(new Date(), 1),
      status: 'PENDING',
      serviceProfessional: {
        title: 'Makeup',
        id: '1',
        price: 0,
        currency: 'USD',
        duration: 0,
        serviceId: '',
        professionalId: '',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      guestFirstName: 'Natalie',
    },
  },
  render: (props) => {
    return (
      <div style={{ paddingBottom: '150px' }}>
        <BookingInfoCard {...props} />
      </div>
    );
  },
};
