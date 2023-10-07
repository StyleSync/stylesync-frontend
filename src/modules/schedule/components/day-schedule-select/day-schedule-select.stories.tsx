import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from 'usehooks-ts';
// utils
import { formatTimeRange, Time } from '@/modules/core/utils/time.utils';

import { DayScheduleSelect } from './day-schedule-select';

const meta: Meta<typeof DayScheduleSelect> = {
  title: 'Schedule UI/DayScheduleSelect',
  component: DayScheduleSelect,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DayScheduleSelect>;

export const Base: Story = {
  render: () => {
    const isActive = useBoolean();
    const [daySchedule, setDaySchedule] = useState(
      formatTimeRange(new Time(), new Time())
    );
    const [breaks, setBreaks] = useState<string[]>([]);

    return (
      <DayScheduleSelect
        day='monday'
        workHours={daySchedule}
        onWorkHoursChange={setDaySchedule}
        breaks={breaks}
        onBreaksChange={setBreaks}
        isActive={isActive.value}
        onActiveChange={isActive.setValue}
      />
    );
  },
};
