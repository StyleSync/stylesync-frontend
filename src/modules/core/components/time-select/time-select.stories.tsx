import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Time } from '@/modules/core/utils/time.utils';

import { TimeSelect } from './time-select';

const meta: Meta<typeof TimeSelect> = {
  title: 'Core UI/TimeSelect',
  component: TimeSelect,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TimeSelect>;

export const Base: Story = {
  render: () => {
    const [time, setTime] = useState(new Time());

    return (
      <>
        <TimeSelect value={time} onChange={setTime} />
      </>
    );
  },
};
