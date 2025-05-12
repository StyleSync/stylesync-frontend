import type { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/modules/core/components/button';

import { DialogFullScreen } from './dialog-full-screen';

const meta: Meta<typeof DialogFullScreen> = {
  title: 'Core UI/DialogFullScreen',
  component: DialogFullScreen,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DialogFullScreen>;

export const Base: Story = {
  render: () => {
    const isOpen = useBoolean();

    return (
      <>
        <Button text='Open' onClick={isOpen.setTrue} />
        <DialogFullScreen isOpen={isOpen.value} onOpenChange={isOpen.setValue}>
          <Button
            icon='close'
            className='ml-auto mr-6 mt-6'
            onClick={isOpen.setFalse}
          />
        </DialogFullScreen>
      </>
    );
  },
};
