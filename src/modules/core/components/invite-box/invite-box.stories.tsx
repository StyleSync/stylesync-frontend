import type { Meta, StoryObj } from '@storybook/react';

import { InviteBox } from './invite-box';

const meta: Meta<typeof InviteBox> = {
  title: 'Core UI/InviteBox',
  component: InviteBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InviteBox>;

export const Base: Story = {
  args: {
    title: 'Link to your profile!',
    subTitle:
      'We highly recommend adding a link to your business account on Instagram, Facebook, or any other platform you use to connect with your clients',
    copyText: 'stylesync/gloria-dalas',
  },
};
