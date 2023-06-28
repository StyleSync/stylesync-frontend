import type { Meta, StoryObj } from '@storybook/react';

import { Icon, icons } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Core UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      options: Object.keys(icons),
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Variants: Story = {
  render: (args) => (
    <Icon {...args} width={30} height={30}>
      Title.
    </Icon>
  ),
};
