import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './link';

const meta: Meta<typeof Link> = {
  title: 'Core UI/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Base: Story = {
  args: {
    href: '#',
    children: 'link',
  },
};
