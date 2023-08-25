import type { Meta, StoryObj } from '@storybook/react';

import { ServiceEntity } from './service-entity';

const meta: Meta<typeof ServiceEntity> = {
  title: 'Service/ServiceEntity',
  component: ServiceEntity,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ServiceEntity>;

export const Default: Story = {};
