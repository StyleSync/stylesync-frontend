import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Core UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Base: Story = {
  args: {
    variant: 'primary',
    text: 'Primary button',
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 20 }}>
        <div style={{ display: 'flex', columnGap: 20 }}>
          <Button variant='primary' text='Button' />
          <Button variant='primary' text='Button' icon='heart' />
          <Button variant='primary' icon='heart' />
        </div>
        <div style={{ display: 'flex', columnGap: 20 }}>
          <Button variant='secondary' text='Button' />
          <Button variant='secondary' text='Button' icon='heart' />
          <Button variant='secondary' icon='heart' />
        </div>
      </div>
    );
  },
};
