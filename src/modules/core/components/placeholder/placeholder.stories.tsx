import type { Meta, StoryObj } from '@storybook/react';

import { Placeholder } from './placeholder';
import { Typography } from '@/modules/core/components';

const meta: Meta<typeof Placeholder> = {
  title: 'Core UI/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Placeholder>;

export const Base: Story = {
  args: {
    isActive: true,
    placeholder: <Typography>I am placeholder</Typography>,
  },
};

export const IllustrationPlaceholder: Story = {
  args: {
    isActive: true,
    placeholder: {
      illustration: 'files',
      description: 'No files added',
    },
  },
};
