import type { Meta, StoryObj } from '@storybook/react';

import { ZoomControl } from './zoom';

const meta: Meta<typeof ZoomControl> = {
  title: 'Core UI/Zoom',
  component: ZoomControl,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ZoomControl>;

export const Default: Story = {};
