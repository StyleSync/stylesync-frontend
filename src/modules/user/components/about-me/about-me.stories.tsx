import type { Meta, StoryObj } from '@storybook/react';

import { AboutMe } from './about-me';

const meta: Meta<typeof AboutMe> = {
  title: 'User UI/AboutMe',
  component: AboutMe,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AboutMe>;

export const Default: Story = {};
