import type { Meta, StoryObj } from '@storybook/react';

import { AvatarSelect } from './avatar-select';

const meta: Meta<typeof AvatarSelect> = {
  title: 'Core UI/AvatarSelectMobile',
  component: AvatarSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AvatarSelect>;

export const Base: Story = {
  args: {},
};
