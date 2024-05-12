import type { Meta, StoryObj } from '@storybook/react';

import { DialogBottom } from './dialog-bottom';
import { useBoolean } from 'usehooks-ts';
import { Button } from '@/modules/core/components/button';

const meta: Meta<typeof DialogBottom> = {
  title: 'Core UI/DialogBottom',
  component: DialogBottom,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DialogBottom>;

export const Base: Story = {
  render: () => {
    const isOpen = useBoolean();

    return (
      <>
        <Button text='Open' onClick={isOpen.setTrue} />
        <DialogBottom isOpen={isOpen.value} onOpenChange={isOpen.setValue}>
          <div className='flex h-[400px] p-6 justify-end'>
            <Button
              icon='close'
              variant='secondary'
              onClick={isOpen.setFalse}
            />
          </div>
        </DialogBottom>
      </>
    );
  },
};
