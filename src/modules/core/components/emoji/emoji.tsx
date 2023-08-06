import { type FC } from 'react';
import Lottie from 'lottie-react';
// animations
import sunglasses from '@/assets/lottie-files/emoji/emoji-sunglasses.json';
import heartEyes from '@/assets/lottie-files/emoji/emoji-heart-eyes.json';

// keys
const emojies = {
  sunglasses,
  'heart-eyes': heartEyes,
} satisfies Record<string, object>;

export type EmojiName = keyof typeof emojies;

type EmojiProps = {
  name: EmojiName;
  width: number;
  height: number;
};

const Emoji: FC<EmojiProps> = ({ name, width, height }) => {
  const style = { width, height };
  const animationsData = emojies[name];

  return <Lottie style={style} animationData={animationsData} />;
};

export { Emoji };
