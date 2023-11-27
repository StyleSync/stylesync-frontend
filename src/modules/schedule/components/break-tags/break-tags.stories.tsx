import type { Meta, StoryObj } from '@storybook/react';

import { BreakTags } from './break-tags';

const meta: Meta<typeof BreakTags> = {
  title: 'Schedule UI/BreakTags',
  component: BreakTags,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BreakTags>;

export const Base: Story = {};
