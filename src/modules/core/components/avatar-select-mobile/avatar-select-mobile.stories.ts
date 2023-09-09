import type { Meta, StoryObj } from '@storybook/react';

import { AvatarSelectMobile } from './avatar-select-mobile';

const meta: Meta<typeof AvatarSelectMobile> = {
  title: 'Core UI/AvatarSelectMobile',
  component: AvatarSelectMobile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AvatarSelectMobile>;

export const Base: Story = {
  args: {},
};
