import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Core UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Base: Story = {
  args: {
    variant: 'info',
    isOpen: true,
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentence(7),
  },
};
