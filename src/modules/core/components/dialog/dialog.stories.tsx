import type { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from 'usehooks-ts';

import { Typography } from '@/modules/core/components/typogrpahy';

import { Dialog } from './dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Core UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Base: Story = {
  render: () => {
    const isOpen = useBoolean();

    return (
      <>
        <button onClick={isOpen.setTrue}>open modal</button>
        <Dialog isOpen={isOpen.value} onOpenChange={isOpen.setValue}>
          <Typography>Hello from modal</Typography>
        </Dialog>
      </>
    );
  },
};
