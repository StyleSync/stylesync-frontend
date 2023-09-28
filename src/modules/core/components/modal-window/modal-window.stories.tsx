import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ModalWindow, Typography } from '@/modules/core/components';

const meta: Meta<typeof ModalWindow> = {
  title: 'Core UI/ModalWindow',
  component: ModalWindow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ModalWindow>;

// export const Default: Story = {};

export const Base: Story = {
  render: () => {
    return (
      <ModalWindow trigger={<button>open</button>}>
        <Typography>Hello from modal</Typography>
      </ModalWindow>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)}>open modal</button>
        <ModalWindow isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Typography>Hello from modal</Typography>
        </ModalWindow>
      </>
    );
  },
};
