import type { Meta, StoryObj } from '@storybook/react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';

import { Placeholder } from './placeholder';

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
