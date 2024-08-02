import type { Meta, StoryObj } from '@storybook/react';

import { PhoneField } from './phone-field';
import { useState } from 'react';

const meta: Meta<typeof PhoneField> = {
  title: 'Core UI/PhoneField',
  component: PhoneField,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof PhoneField>;

export const Base: Story = {
  render: () => {
    const [phone, setPhone] = useState('');

    return <PhoneField onChange={setPhone} value={phone} />;
  },
};
