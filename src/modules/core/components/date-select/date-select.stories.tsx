import type { Meta, StoryObj } from '@storybook/react';

import { DateSelect } from './date-select';

const meta: Meta<typeof DateSelect> = {
  title: 'Core UI/DateSelect',
  component: DateSelect,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DateSelect>;

export const Base: Story = {};
