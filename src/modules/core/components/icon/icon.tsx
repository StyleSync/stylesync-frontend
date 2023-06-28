import { type FC, memo } from 'react';
// icons
import PhoneIcon from '@/assets/icons/phone.svg?icon';
import ImageNotFoundIcon from '@/assets/icons/image-not-found.svg?icon';

import { SVGComponentElement } from './icon.interface';

export const icons = {
  phone: PhoneIcon,
  'image-not-found': ImageNotFoundIcon,
} satisfies Record<string, FC<SVGComponentElement>>;

type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
} & SVGComponentElement;

const Icon: FC<IconProps> = memo(({ name, ...props }) => {
  const IconElement = icons[name];

  if (!IconElement) {
    const ImageNotFoundIconElement = icons['image-not-found'];

    return <ImageNotFoundIconElement {...props} />;
  }

  return <IconElement {...props} />;
});

Icon.displayName = 'Icon';

export { Icon };
