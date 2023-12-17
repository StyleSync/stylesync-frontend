import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from './tag';

const meta: Meta<typeof Tag> = {
  title: 'Service/ServiceTag',
  component: Tag,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    icon: 'makeup',
    text: 'Makeup',
  },
};
