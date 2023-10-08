import type { Meta, StoryObj } from '@storybook/react';

import { DropdownMenu } from './dropdown-menu';
import { Button } from '@/modules/core/components';
import { useBoolean } from 'usehooks-ts';

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
