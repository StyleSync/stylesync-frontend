import type { Meta, StoryObj } from '@storybook/react';
// components
import { Typography } from '@/modules/core/components/typogrpahy';
import { TextField } from '@/modules/core/components/text-field';
// constants
import scssVariables from '@/styles/variables.module.scss';

import { Icon, icons, type IconName } from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Core UI/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      options: Object.keys(icons),
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Variants: Story = {
  render: (args) => (
    <Icon {...args} width={30} height={30} style={{ color: '#323E4A' }}>
      Title.
    </Icon>
  ),
};

export const Board: Story = {
  render: () => {
    return (
      <div>
        <div style={{ marginBottom: '30px' }}>
          <TextField variant='input' label='Search' />
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {Object.keys(icons).map((iconName) => (
            <div
              key={iconName}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                rowGap: '5px',
                padding: '10px',
                boxShadow: scssVariables.mainBoxShadow,
                borderRadius: '6px',
              }}
            >
              <Icon name={iconName as IconName} width={30} height={30} />
              <Typography variant='small'>{iconName}</Typography>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
