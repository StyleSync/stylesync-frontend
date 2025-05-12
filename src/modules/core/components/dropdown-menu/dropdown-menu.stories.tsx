import type { Meta, StoryObj } from '@storybook/react';
import { useBoolean } from 'usehooks-ts';

import { Button } from '@/modules/core/components/button';

import { DropdownMenu } from './dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Core UI/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Base: Story = {
  render: () => {
    const isOpen = useBoolean();

    return (
      <DropdownMenu
        items={[
          {
            id: 'makeup',
            text: 'Makeup',
            icon: 'makeup',
          },
          {
            id: 'nails',
            text: 'Nails',
            icon: 'nails',
          },
        ]}
        trigger={<Button text='Open' onClick={isOpen.toggle} />}
        isOpen={isOpen.value}
        onClose={isOpen.setFalse}
        onSelect={isOpen.setFalse}
      />
    );
  },
};
