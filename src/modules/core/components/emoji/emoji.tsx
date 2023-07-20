import { type FC } from 'react';
// animations
import Lottie from 'lottie-react';
import sunglasses from '../../../../assets/animations/emoji_sunglasses.json';
import heartEyes from '../../../../assets/animations/emoji_heart_eyes.json';

import type { EmojiProps } from './emoji.interface';

// keys
const emojiAnimations: Record<'sunglasses' | 'heart_eyes', unknown> = {
  sunglasses,
  heart_eyes: heartEyes,
};

const Emoji: FC<EmojiProps> = ({ name, width, height }) => {
  const style = { width, height };
  const animationsData = emojiAnimations[name];

  return <Lottie style={style} animationData={animationsData} />;
};

export { Emoji };
