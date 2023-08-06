import type { Meta, StoryObj } from '@storybook/react';
// components
import { Typography } from '@/modules/core/components';

import { Popover } from './popover';
import { useBoolean } from 'usehooks-ts';
import { Button } from '@/modules/core/components/button';

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
