import type { Meta, StoryObj } from '@storybook/react';

import { ItemsListEmptyIllustrationPlaceholder } from './items-list-empty-illustration-placeholder';

const meta: Meta<typeof ItemsListEmptyIllustrationPlaceholder> = {
  title: 'Core UI/ItemsListEmptyIllustrationPlaceholder',
  component: ItemsListEmptyIllustrationPlaceholder,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ItemsListEmptyIllustrationPlaceholder>;

export const Base: Story = {
  args: {
    illustration: 'files',
    description: 'List is empty',
    isActive: true,
  },
};
