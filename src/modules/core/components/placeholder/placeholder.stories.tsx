import type { Meta, StoryObj } from '@storybook/react';

import { Placeholder } from './placeholder';

const meta: Meta<typeof Placeholder> = {
  title: 'Core UI/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Placeholder>;

export const Base: Story = {};
