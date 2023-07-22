import type { Meta, StoryObj } from '@storybook/react';

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
      <span>
        <span
          style={{
            color: '#3B82EF',
          }}
        >
          Press here
        </span>{' '}
        to select an avatar image or drag and drop
      </span>
    </ImageSelector>
  ),
};
