import type { Meta, StoryObj } from '@storybook/react';

import { Zoom } from './zoom';

const meta: Meta<typeof Zoom> = {
  title: 'Core UI/Zoom',
  component: Zoom,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Zoom>;

export const Default: Story = {};
