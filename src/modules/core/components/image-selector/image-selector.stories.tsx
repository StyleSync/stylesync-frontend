import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@/modules/core/components/typogrpahy';

import { ImageSelector } from '././image-selector';

const meta: Meta<typeof ImageSelector> = {
  title: 'Core UI/ImageSelector',
  component: ImageSelector,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
  argTypes: {
    classes: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageSelector>;

export const Default: Story = {};

export const AvatarSelect: Story = {
  render: (args) => (
    <ImageSelector {...args}>
      <Typography>
        <span
          style={{
            color: '#3B82EF',
          }}
        >
          Press here
        </span>{' '}
        to select an avatar image or drag and drop
      </Typography>
    </ImageSelector>
  ),
};
