import type { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from 'usehooks-ts';
// components
import { Button } from '@/modules/core/components';

import { SplashGreetingBoard } from './splash-greeting-board';

const meta: Meta<typeof SplashGreetingBoard> = {
  title: 'Core UI/SplashScreenBoard',
  component: SplashGreetingBoard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SplashGreetingBoard>;

export const Base: Story = {
  render: () => {
    const isOpen = useBoolean();

    const trigger = () => {
      isOpen.setTrue();

      const TIMEOUT = 4000;

      setTimeout(() => {
        isOpen.setFalse();
      }, TIMEOUT);
    };

    return (
      <>
        {isOpen.value ? (
          <SplashGreetingBoard />
        ) : (
          <Button text='Trigger splash greeting board' onClick={trigger} />
        )}
      </>
    );
  },
};
