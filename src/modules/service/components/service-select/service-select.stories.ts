import type { Meta, StoryObj } from '@storybook/react';

import { ServiceSelect } from './service-select';

const meta: Meta<typeof ServiceSelect> = {
  title: 'Service/ServiceSelect',
  component: ServiceSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ServiceSelect>;

export const Default: Story = {
  args: {
    services: [
      {
        id: 'makeup',
        name: 'Makeup',
        icon: 'makeup',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'nails',
        name: 'Nails',
        icon: 'nails',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'haircut',
        name: 'Hair',
        icon: 'haircut',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};
