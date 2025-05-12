import { type FC, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@/modules/core/components/typogrpahy';

import { RadioButton } from './radio-button';

const meta: Meta<typeof RadioButton> = {
  title: 'Core UI/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

const BaseCardWithRadioButton: FC<{
  value: string;
  title: string;
  onClick?: (name: string) => void;
}> = ({ value, title, onClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 20px 4px 10px',
        columnGap: '5px',
        borderRadius: '6px',
        boxShadow: '0px 4px 15px 0px rgba(37, 74, 165, 0.10)',
        cursor: onClick ? 'pointer' : 'unset',
      }}
      onClick={() => onClick && onClick(value)}
    >
      <RadioButton value={value} />
      <Typography>{title}</Typography>
    </div>
  );
};

export const Base: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <RadioButton.Group value={value} onChange={setValue} name='cards'>
        <div style={{ display: 'grid', rowGap: '20px', width: 'fit-content' }}>
          <BaseCardWithRadioButton value='card1' title='Card 1' />
          <BaseCardWithRadioButton value='card2' title='Card 2' />
          <BaseCardWithRadioButton
            value='card3'
            title='Card 3 (Click by card to select)'
            onClick={setValue}
          />
        </div>
      </RadioButton.Group>
    );
  },
};
