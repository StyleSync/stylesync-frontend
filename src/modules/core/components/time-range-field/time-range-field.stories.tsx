import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { formatTimeRange, Time } from '@/modules/core/utils/time.utils';

import { TimeRangeField } from './time-range-field';

const meta: Meta<typeof TimeRangeField> = {
  title: 'Core UI/TimeRangeField',
  component: TimeRangeField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimeRangeField>;

export const Base: Story = {
  render: () => {
    const [value, setValue] = useState(formatTimeRange(new Time(), new Time()));

    return (
      <div style={{ maxWidth: 300 }}>
        <TimeRangeField value={value} onChange={setValue} />
      </div>
    );
  },
};
