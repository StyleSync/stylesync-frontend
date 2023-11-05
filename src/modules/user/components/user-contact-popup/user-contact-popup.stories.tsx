import type { Meta, StoryObj } from '@storybook/react';

import { UserContactPopup } from './user-contact-popup';

const meta: Meta<typeof UserContactPopup> = {
  title: 'User UI/UserContactPopup',
  component: UserContactPopup,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof UserContactPopup>;

export const Base: Story = {};
