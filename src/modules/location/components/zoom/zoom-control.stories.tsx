import type { Meta, StoryObj } from '@storybook/react';

import { ZoomControl } from './zoom-control';

const meta: Meta<typeof ZoomControl> = {
  title: 'Location UI/ZoomControl',
  component: ZoomControl,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ZoomControl>;

export const Default: Story = {};
