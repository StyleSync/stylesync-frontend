import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Time } from '@/modules/core/utils/time.utils';

import { TimeField } from './time-field';

const meta: Meta<typeof TimeField> = {
  title: 'Core UI/TimeField',
  component: TimeField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimeField>;

export const Base: Story = {
  render: () => {
    const [value, setValue] = useState<string>(new Time().getString());

    return (
      <div style={{ maxWidth: 300, minHeight: 500 }}>
        <TimeField
          value={value}
          onChange={setValue}
          inputProps={{
            label: 'Start time',
          }}
        />
      </div>
    );
  },
};
