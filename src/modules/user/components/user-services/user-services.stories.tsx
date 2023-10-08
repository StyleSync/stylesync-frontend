import type { Meta, StoryObj } from '@storybook/react';

import { Services } from './user-services';

const meta: Meta<typeof Services> = {
  title: 'User UI/Services',
  component: Services,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Services>;

export const Default: Story = {};
