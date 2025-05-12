import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@/modules/core/components/typogrpahy';
import scssVariables from '@/styles/variables.module.scss';

import {
  Illustration,
  type IllustrationName,
  illustrations,
} from './illustration';

const meta: Meta<typeof Illustration> = {
  title: 'Core UI/Illustration',
  component: Illustration,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const Base: Story = {
  args: {
    name: 'folder',
    width: 400,
  },
};

export const Board: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {Object.keys(illustrations).map((illustrationName) => (
          <div
            key={illustrationName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              rowGap: '15px',
              padding: '30px',
              boxShadow: scssVariables.mainBoxShadow,
              borderRadius: '6px',
            }}
          >
            <Illustration
              width={100}
              name={illustrationName as IllustrationName}
            />
            <Typography variant='small'>{illustrationName}</Typography>
          </div>
        ))}
      </div>
    );
  },
};
