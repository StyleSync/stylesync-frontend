import type { Meta, StoryObj } from '@storybook/react';

import { DialogFullScreen } from './dialog-full-screen';

const meta: Meta<typeof DialogFullScreen> = {
  title: 'Core UI/DialogFullScreen',
  component: DialogFullScreen,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DialogFullScreen>;

export const Base: Story = {};
