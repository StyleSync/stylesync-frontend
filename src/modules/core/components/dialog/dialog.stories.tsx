import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog, Typography } from '@/modules/core/components';

const meta: Meta<typeof Dialog> = {
  title: 'Core UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Base: Story = {
  render: () => {
    return (
      <Dialog trigger={<button>open</button>}>
        <Typography>Hello from modal</Typography>
      </Dialog>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>open modal</button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Typography>Hello from modal</Typography>
        </Dialog>
      </>
    );
  },
};
