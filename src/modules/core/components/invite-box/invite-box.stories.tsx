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
    variant: 'link',
    title: 'Link to your profile!',
    titleColor: 'yellow',
    subTitle:
      'We highly recommend adding a link to your business account on Instagram, Facebook, or any other platform you use to connect with your clients',
    copyText: 'stylesync/gloria-dalas',
    icon: [
      'instagram-logo-invite',
      'facebook-logo',
      'facebook-messenger',
      'gmail',
      'viber',
    ],
  },
};
