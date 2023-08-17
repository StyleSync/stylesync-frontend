import type { Meta, StoryObj } from '@storybook/react';

import { UserHeader } from './user-header';

const meta: Meta<typeof UserHeader> = {
  title: 'User UI/UserHeader',
  component: UserHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserHeader>;

export const Default: Story = {};
