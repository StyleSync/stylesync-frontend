import type { Meta, StoryObj } from '@storybook/react';

import Image from '@/assets/images/screenshot.png';

import { IphoneLayout } from './iphone-layout';

const meta: Meta<typeof IphoneLayout> = {
  title: 'Core UI/IphoneLayout',
  component: IphoneLayout,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof IphoneLayout>;

export const Base: Story = {
  args: {
    width: 400,
    imageUrl: Image.src,
  },
};
