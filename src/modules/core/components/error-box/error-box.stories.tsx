import type { Meta, StoryObj } from '@storybook/react';

import { ErrorBox } from './error-box';
import { faker } from '@faker-js/faker';

const meta: Meta<typeof ErrorBox> = {
  title: 'Core UI/ErrorBox',
  component: ErrorBox,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ErrorBox>;

export const Base: Story = {
  args: {
    title: faker.lorem.sentence(4),
    description: faker.lorem.sentence(12),
  },
};
