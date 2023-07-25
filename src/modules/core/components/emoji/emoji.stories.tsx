import type { Meta, StoryObj } from '@storybook/react';

import { Emoji, type EmojiName } from './emoji';
import 'leaflet/dist/leaflet.css';

const meta: Meta<typeof Emoji> = {
  title: 'Core UI/Emoji',
  component: Emoji,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Emoji>;

export const Base: Story = {
  args: { width: 30, height: 30, name: 'sunglasses' },
};

const emojiList: EmojiName[] = ['sunglasses', 'heart-eyes'];

export const Emojies: Story = {
  render: () => (
    <div style={{ display: 'flex', columnGap: 15 }}>
      {emojiList.map((name) => (
        <Emoji key={name} name={name} width={30} height={30} />
      ))}
    </div>
  ),
};
