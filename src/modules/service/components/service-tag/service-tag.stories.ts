import type { Meta, StoryObj } from '@storybook/react';

import { ServiceTag } from './service-tag';

const meta: Meta<typeof ServiceTag> = {
  title: 'Service/ServiceTag',
  component: ServiceTag,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ServiceTag>;

export const Default: Story = {
  args: {
    data: {
      name: 'Makeup',
      id: 'makeup',
      icon: 'makeup',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};
