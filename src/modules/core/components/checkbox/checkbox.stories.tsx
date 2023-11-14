import type { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from 'usehooks-ts';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Core UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Base: Story = {
  render() {
    const isActive = useBoolean();

    return <Checkbox onChange={isActive.toggle} value={isActive.value} />;
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', columnGap: '10px' }}>
      <Checkbox value={false} disabled />
      <Checkbox value disabled />
    </div>
  ),
};
