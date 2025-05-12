import type { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/modules/core/components/button';
import { Typography } from '@/modules/core/components/typogrpahy';

import { Popover } from './popover';

const meta: Meta<typeof Popover> = {
  title: 'Core UI/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Base: Story = {
  render: () => {
    const isPopoverOpen = useBoolean();

    return (
      <Popover
        trigger={<Button onClick={isPopoverOpen.toggle} text='Toggle' />}
        isOpen={isPopoverOpen.value}
        onClose={isPopoverOpen.setFalse}
      >
        <div style={{ padding: 20 }}>
          <Typography>Hello world!!!</Typography>
        </div>
      </Popover>
    );
  },
};
