import type { Meta, StoryObj } from '@storybook/react';

import { GradientButton } from './gradient-button';

import scssVariables from '@/styles/variables.module.scss';

const meta: Meta<typeof GradientButton> = {
  title: 'Core UI/GradientButton',
  component: GradientButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GradientButton>;

export const Base: Story = {
  args: {
    text: 'Hello world',
    gradient: scssVariables.instagramGradient,
  },
};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', columnGap: 30 }}>
      <GradientButton
        gradient={scssVariables.instagramGradient}
        text='Instagram'
        icon='instagram-logo'
      />
      <GradientButton
        gradient={scssVariables.facebookGradient}
        text='Facebook'
        icon='facebook-logo'
      />
    </div>
  ),
};
