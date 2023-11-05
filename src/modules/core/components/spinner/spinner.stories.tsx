import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Core UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Base: Story = {};

export const Sizes: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', columnGap: '30px' }}>
        <Spinner size='small' />
        <Spinner size='medium' />
        <Spinner size='large' />
        <Spinner size={120} />
      </div>
    );
  },
};
