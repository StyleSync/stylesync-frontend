import type { Meta, StoryObj } from '@storybook/react';

import { Emoji } from './emoji';

const meta: Meta<typeof Emoji> = {
  title: 'Core UI/Emoji',
  component: Emoji,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Emoji>;

export const Base: Story = {
  args: { width: 30, height: 30, name: 'sunglasses' },

  render(props) {
    return <Emoji {...props} />;
  },
};
const emojiList = ['sunglasses', 'heart_eyes'] as const;

export const Emojies: Story = {
  render() {
    return (
      <div style={{ display: 'flex', columnGap: 15 }}>
        {emojiList.map((name) => (
          <Emoji key={name} name={name} width={30} height={30} />
        ))}
      </div>
    );
  },
};
