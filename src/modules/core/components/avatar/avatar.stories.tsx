import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Core UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    // url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPeg-dzIDOCGO3HF0p__2il1jVuAQ5XfTEjw&usqp=CAU',
    size: 'small',
    shape: 'circle',
  },
};
