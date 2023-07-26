import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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
    const [value, setValue] = useState(true);

    return <Checkbox onChange={setValue} value={value} />;
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
